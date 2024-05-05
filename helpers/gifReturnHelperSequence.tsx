import React, { useEffect } from "react";
import { Image, View } from "react-native";

// arm1
import armCirclesClockwiseGif from "@/assets/gifs/arm1/arm_circles_clockwise.gif";
import armCirclesCounterClockwiseGif from "@/assets/gifs/arm1/arm_circles_counterclockwise.gif";
import armRaisesGif from "@/assets/gifs/arm1/arm_raises.gif";
import chestPressPulseGif from "@/assets/gifs/arm1/chest_press_pulse.gif";
import diagonalPlankGif from "@/assets/gifs/arm1/diagonal_plank.gif";
import jumpingJacksGif from "@/assets/gifs/arm1/jumping_jacks.gif";
import legBarrelCurlLeftGif from "@/assets/gifs/arm1/leg_barrel_curl_left.gif";
import legBarrelCurlRightGif from "@/assets/gifs/arm1/leg_barrel_curl_right.gif";
import pushUpGif from "@/assets/gifs/arm1/push_up.gif";
import sideArmRaiseGif from "@/assets/gifs/arm1/side_arm_raise.gif";
import standingBicepStretchLeftGif from "@/assets/gifs/arm1/standing_biceps_stretch_left.gif";
import standingBicepStretchRightGif from "@/assets/gifs/arm1/standing_biceps_stretch_right.gif";
import tricepDipsGif from "@/assets/gifs/arm1/tricep_dips.gif";
import tricepStretchLeftGif from "@/assets/gifs/arm1/triceps_stretch_left.gif";
import tricepStretchRightGif from "@/assets/gifs/arm1/triceps_stretch_right.gif";
import wallPushUpsGif from "@/assets/gifs/arm1/wall_push_ups.gif";

//arm2
import burpeesGif from "@/assets/gifs/arm2/burpees.gif"; // removes _arm_2
import floorTricepDipsGif from "@/assets/gifs/arm2/floor_tricep_dips.gif"; // removes _arm_2
import pushUpRotationGif from "@/assets/gifs/arm2/push_up_rotation.gif"; // removes _arm_2
import skippingWithoutRopeGif from "@/assets/gifs/arm2/skipping_without_rope.gif"; // removes _arm_2

//chest1
import cobraStretchGif from "@/assets/gifs/chest1/cobra_stretch.gif";
import kneePushUpsGif from "@/assets/gifs/chest1/knee_push_ups.gif";
import wideArmPushUpGif from "@/assets/gifs/chest1/wide_arm_push_up.gif";

//chest2
import shoulderStretch from "@/assets/gifs/chest2/shoulder_stretch.gif";

//leg1
import backwardLungeGif from "@/assets/gifs/leg1/backward_lunge.gif";
import calfStretchLeftGif from "@/assets/gifs/leg1/calf_stretch_left.gif";
import calfStretchRightGif from "@/assets/gifs/leg1/calf_stretch_right.gif";
import kneeToChestStretchLeftGif from "@/assets/gifs/leg1/knee_to_chest_stretch_left.gif";
import kneeToChestStretchRightGif from "@/assets/gifs/leg1/knee_to_chest_stretch_right.gif";
import leftQuadStretchWithWallGif from "@/assets/gifs/leg1/left_quad_stretch_with_wall.gif";
import rightQuadStretchWithWallGif from "@/assets/gifs/leg1/right_quad_stretch_with_wall.gif";
import sideLyingLegLiftLeftGif from "@/assets/gifs/leg1/side_lying_leg_lift_left.gif";
import sideLyingLegLiftRightGif from "@/assets/gifs/leg1/side_lying_leg_lift_right.gif";
import squatsGif from "@/assets/gifs/leg1/squats.gif";
import wallCalfRaiseGif from "@/assets/gifs/leg1/wall_calf_raise.gif";

//leg2
import fireHydrantLeftGif from "@/assets/gifs/leg2/fire_hydrant_left.gif";
import fireHydrantRightGif from "@/assets/gifs/leg2/fire_hydrant_right.gif";
import sideLegCirclesLeftGif from "@/assets/gifs/leg2/side_leg_circles_left.gif";
import sideLegCirclesRightGif from "@/assets/gifs/leg2/side_leg_circles_right.gif";
import sumoSquatGif from "@/assets/gifs/leg2/sumo_squat.gif";
import wallSitGif from "@/assets/gifs/leg2/wall_sit.gif";
const importNames: any[][] = [
  [
    armRaisesGif,
    sideArmRaiseGif,
    tricepDipsGif,
    armCirclesClockwiseGif,
    armCirclesCounterClockwiseGif,
    jumpingJacksGif,
    chestPressPulseGif,
    legBarrelCurlLeftGif,
    legBarrelCurlRightGif,
    diagonalPlankGif,
    pushUpGif,
    wallPushUpsGif,
    tricepStretchLeftGif,
    tricepStretchRightGif,
    standingBicepStretchLeftGif,
    standingBicepStretchRightGif,
  ],
  [
    armCirclesClockwiseGif,
    armCirclesCounterClockwiseGif,
    floorTricepDipsGif,
    pushUpRotationGif,
    legBarrelCurlLeftGif,
    legBarrelCurlRightGif,
    floorTricepDipsGif,
    pushUpRotationGif,
    legBarrelCurlLeftGif,
    legBarrelCurlRightGif,
    skippingWithoutRopeGif,
    pushUpGif,
    burpeesGif,
    skippingWithoutRopeGif,
    pushUpGif,
    tricepStretchLeftGif,
    tricepStretchRightGif,
    standingBicepStretchLeftGif,
    standingBicepStretchRightGif,
  ],
  [
    jumpingJacksGif,
    pushUpGif,
    wideArmPushUpGif,
    tricepDipsGif,
    wideArmPushUpGif,
    tricepDipsGif,
    kneePushUpsGif,
    cobraStretchGif,
  ],
  [
    jumpingJacksGif,
    kneePushUpsGif,
    pushUpGif,
    wideArmPushUpGif,
    pushUpRotationGif,
    kneePushUpsGif,
    shoulderStretch,
    cobraStretchGif,
  ],
  [
    squatsGif,
    sideLyingLegLiftLeftGif,
    sideLyingLegLiftRightGif,
    sideLyingLegLiftLeftGif,
    sideLyingLegLiftRightGif,
    backwardLungeGif,
    backwardLungeGif,
    leftQuadStretchWithWallGif,
    rightQuadStretchWithWallGif,
    kneeToChestStretchLeftGif,
    kneeToChestStretchRightGif,
    wallCalfRaiseGif,
    wallCalfRaiseGif,
    calfStretchLeftGif,
    calfStretchRightGif,
  ],
  [
    jumpingJacksGif,
    squatsGif,
    squatsGif,
    squatsGif,
    fireHydrantLeftGif,
    fireHydrantRightGif,
    fireHydrantLeftGif,
    fireHydrantRightGif,
    fireHydrantLeftGif,
    fireHydrantRightGif,
    sideLegCirclesLeftGif,
    sideLegCirclesRightGif,
    sideLegCirclesLeftGif,
    sideLegCirclesRightGif,
    sumoSquatGif,
    sumoSquatGif,
    sumoSquatGif,
    wallSitGif,
    leftQuadStretchWithWallGif,
    rightQuadStretchWithWallGif,
    kneeToChestStretchLeftGif,
    kneeToChestStretchRightGif,
    wallCalfRaiseGif,
    wallCalfRaiseGif,
    wallCalfRaiseGif,
    calfStretchLeftGif,
    calfStretchRightGif,
  ],
];
export default function gifReturnHelperSequence({
  exerciseNum,
  sequenceNum,
  onImageSourceChange,
}: {
  exerciseNum: any;
  sequenceNum: any;
  onImageSourceChange: any;
}) {
  useEffect(() => {}, [exerciseNum, sequenceNum]);

  useEffect(() => {
    // Condition to update the image source

    const newImageSource = importNames[exerciseNum][sequenceNum];
    onImageSourceChange(newImageSource);
  }, [exerciseNum, sequenceNum, onImageSourceChange]);

  return null;
}
