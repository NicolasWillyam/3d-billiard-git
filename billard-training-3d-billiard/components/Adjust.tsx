import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import InputRange from "react-input-range";
// import Slider;
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export type AdjustProps = {
  value: number;
  changeValue: () => {};
  max: number;
  min: number;
  label: string;
};

const Adjust = (props: AdjustProps) => {
  return (
    <View style={styles.adjust}>
      <Text style={styles.label}>
        {props.label} : {props.value}
      </Text>
      {/* <Slider
        value={props.value}
        onValueChange={(newValue) => setValue(newValue)}
        maximumValue={props.max}
        minimumValue={props.min}
        step={0.01}
      /> */}
      {/* <Slider
        {...props}
        value={props.value}
        onValueChange={props.changeValue}
        maximumValue={props.max}
        minimumValue={props.min}
        step={0.001}
      /> */}

      {/* <View style={styles.slider}>

        <TextInput
          style={styles.input}
          type="range"
          {...props}
          onChange={props.changeValue}
          min={props.min}
          max={props.max}
          step={0.001}
          value={props.value}
        ></TextInput>
        <p>{props.value}</p>
      </View> */}
    </View>
  );
};

export default Adjust;

const styles = StyleSheet.create({
  adjust: {
    color: "white",
    width: 180,
    height: 60,
    fontSize: 12,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "white",
    left: 10,
    top: 10,
    border: 1,
    borderRadius: 8,
    padding: 4,
  },
  label: {
    color: "white",
  },
});
