import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Task({ text, onComplete, onDelete }) {
  const [isComplete, setIsComplete] = useState(false);

  const handleComplete = () => {
    setIsComplete(!isComplete);
    if (onComplete) {
      onComplete(!isComplete);
    }
  };

  return (
    <TouchableOpacity onPress={handleComplete}>
      <View style={[styles.item, isComplete && styles.itemComplete]}>
        {isComplete ? (
          <View style={styles.squareComplete}>
            <Icon name="check" size={12} color="#FFF" style={styles.icon} />
          </View>
        ) : (
          <View style={styles.squareIncomplete} />
        )}
        <Text style={[styles.itemText, isComplete && styles.itemTextComplete]}>
          {text}
        </Text>
        <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
          <Icon name="trash-o" size={18} color="#8B0000" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 20,
  },
  itemComplete: {
    opacity: 0.6,
  },
  squareIncomplete: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#55BCF6",
    marginRight: 15,
  },
  squareComplete: {
    width: 24,
    height: 24,
    backgroundColor: "#55BCF6",
    borderWidth: 2,
    borderColor: "#55BCF6",
    borderRadius: 5,
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  itemText: {
    maxWidth: "80%",
    fontSize: 16,
  },
  itemTextComplete: {
    color: "#C0C0C0",
    textDecorationLine: "line-through",
  },
  icon: {
    fontWeight: "bold",
  },
  deleteButton: {
    padding: 10,
    marginLeft: 10,
    position: "absolute",
    right: 0,
  },
});
