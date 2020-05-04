import React from "react";
import { TextInput } from "react-native";

type Props = {
  /**
   * Placeholder to display when no value is provided.
   */
  placeholder: string;
  /**
   * Value of the input.
   */
  value?: string;
  /**
   * Called when text in the input changes.
   */
  onTextChange: (text: string) => void;
};

/**
 * Component for main user interactions in the app.
 */
const Input = ({ placeholder, value, onTextChange }: Props) => (
  <TextInput
    placeholder={placeholder}
    onTextChange={onTextChange}
    value={value}
  />
);

export default Input;
