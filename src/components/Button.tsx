import React from "react";
import { Text, TouchableOpacity } from "react-native";

type Props = {
  /**
   * Title of the button.
   */
  children: string;
  /**
   * Called when button is pressed.
   */
  onPress: () => void;
};

/**
 * Component for main user interactions in the app.
 */
const Button = ({ children, onPress }: Props) => (
  <TouchableOpacity onPress={onPress}>
    <Text>{children}</Text>
  </TouchableOpacity>
);

export default Button;
