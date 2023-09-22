import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import Scene from "./view/Scene";
import Lights from "./components/Lights";
import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";

import Animated, {
  Easing,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { withTiming } from "react-native-reanimated";

export default function App() {
  const changeViewTarget: SharedValue<number> = useSharedValue(0);

  const changeView: SharedValue<number> = useSharedValue(0);
  const touch: SharedValue<boolean> = useSharedValue(false);

  const changeTarget = () => {
    changeViewTarget.value = 1 - changeViewTarget.value;
    touch.value = true;
  };
  const stopChangeTarget = () => {
    changeViewTarget.value = 0;
    touch.value = false;
  };
  useDerivedValue(() => {
    if (touch.value === true) {
      changeView.value = withTiming(changeViewTarget.value, {
        duration: 800,
        easing: Easing.in(Easing.poly(4)),
      });
    } else {
      changeView.value = withTiming(changeViewTarget.value, {
        duration: 800,
        easing: Easing.in(Easing.poly(2)),
      });
    }
  });

  const pressed: SharedValue<boolean> = useSharedValue(false);
  const offset: SharedValue<number> = useSharedValue(0.5);
  const transX: SharedValue<number> = useSharedValue(0);

  const pan = Gesture.Pan()
    .onBegin((event) => {
      pressed.value = true;
      transX.value = offset.value;
    })
    .onChange((event) => {
      const step = transX.value + (event.translationY / -420) * 1;
      if (step >= 0 && step <= 1) offset.value = step;
    })
    .onTouchesDown((event) => {
      const firstTouch = event.allTouches[0];
      const yValue = firstTouch.y;
      console.log("Y Value:", yValue);
      offset.value = withTiming((420 - yValue) / 420, {
        duration: 500,
      });
      // offset.value = (420 - yValue) / 420;
    })
    .onFinalize((event) => {
      offset.value = withSpring(offset.value);
      pressed.value = false;
    });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      // { translateY: offset.value * -432 },
      { scale: withTiming(pressed.value ? 1.02 : 1) },
    ],
  }));

  const pressed2: SharedValue<boolean> = useSharedValue(false);
  const offset2: SharedValue<number> = useSharedValue(0.5);
  const transX2: SharedValue<number> = useSharedValue(0);

  const pan2 = Gesture.Pan()
    .onBegin((event) => {
      pressed2.value = true;
      transX2.value = offset2.value;
    })
    .onChange((event) => {
      offset2.value = transX2.value + event.translationX / -432;
    })
    .onFinalize((event) => {
      offset2.value = withSpring(offset2.value);
      pressed2.value = false;
    });

  const animatedStyles2 = useAnimatedStyle(() => ({
    transform: [
      { translateX: (offset2.value * -432) / 10 },
      { scale: withTiming(pressed2.value ? 1.2 : 1) },
    ],
    backgroundColor: pressed2.value ? "#FFE04B" : "#b58df1",
  }));

  const animatedStylesChangeView = useAnimatedStyle(() => ({
    transform: [
      { translateX: 0 },
      { scale: withTiming(touch.value === true ? 1.1 : 1) },
    ],
  }));

  return (
    <>
      <Canvas className="webGL">
        <Lights />
        <Scene
          target={"topRight"}
          distance={2}
          cutAngle={15}
          side="right"
          showAimPoint={true}
          eyeHeight={offset} // min = 1.8, max = 7
          eyeDistance={offset} // min = 0, max = 1
          rotateAngle={offset2}
          // handleCheck={handleCheck}
          changeTargetView={changeView}
        />
        {/* <Controls target={target} distance={2} cutAngle={15} /> */}
      </Canvas>

      <View style={styles.container}>
        <View className="absolute bottom-10 ml-2">
          <TouchableOpacity
            activeOpacity={0.4}
            onPressIn={changeTarget}
            onPressOut={stopChangeTarget}
          >
            <Animated.View
              style={animatedStylesChangeView}
              className="h-12 w-32 rounded-full flex items-center justify-center bg-gray-500 opacity-40"
            >
              <Text className="text-white font-semibold">Press</Text>
            </Animated.View>
          </TouchableOpacity>
        </View>

        <View className="h-1/2 top-[25%] w-8 ml-4 flex-1  justify-end absolute bg-gray- opacity-50 rounded-full">
          <GestureHandlerRootView className="flex-1 -ml-2 absolute left-0 ">
            <GestureDetector gesture={pan}>
              <Animated.View
                style={animatedStyles}
                className="h-[420px] w-8 bg-white opacity-50 rounded-full justify-center items-center flex-col"
              >
                {/* <Text className="text-gray-500 text-xs">Up</Text>
                <Text className="text-gray-500 text-xs">Down</Text> */}
              </Animated.View>
            </GestureDetector>
          </GestureHandlerRootView>
        </View>

        <GestureHandlerRootView className="flex-1 absolute mr-5 right-0 bg-black">
          <GestureDetector gesture={pan2}>
            <Animated.View
              style={animatedStyles2}
              className="h-16 w-16 bg-white opacity-50  bottom-20 rounded-full justify-center items-center flex-col -pt-1"
            >
              <Text className="text-gray-500 ">Left</Text>
              <Text className="text-gray-500 ">Right</Text>
            </Animated.View>
          </GestureDetector>
        </GestureHandlerRootView>

        {/* <Adjust
          label="Eye Height"
          min={0}
          max={1.5}
          changeValue={changeEyeHeightValue}
          value={eyeHeight}
        />


        <Adjust
          label="Rotate"
          min={-50}
          max={50}
          changeValue={changeRotateAngleValue}
          value={rotateAngle}
        /> */}
      </View>

      {/* <View
        style={{
          backgroundColor: checkValue ? "green" : "red",
          cursor: "pointer",
          borderRadius: 5,
          width: 60,
          height: 30,
          top: 50,
          left: "46%",
          position: "absolute",
        }}
      ></View> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    color: "#999",
    fontSize: 12,
    position: "absolute",
    padding: 0,
  },

  box: {
    height: 50,
    backgroundColor: "#b58df1",
    borderRadius: 20,
    marginVertical: 64,
  },
});
