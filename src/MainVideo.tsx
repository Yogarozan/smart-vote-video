import React from "react";
import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { Scene1Opening } from "./scenes/Scene1Opening";
import { Scene2Problem } from "./scenes/Scene2Problem";
import { Scene3Solution } from "./scenes/Scene3Solution";
import { Scene4Platform } from "./scenes/Scene4Platform";
import { Scene5AdminDashboard } from "./scenes/Scene5AdminDashboard";
import { Scene6Voting } from "./scenes/Scene6Voting";
import { Scene7Results } from "./scenes/Scene7Results";
import { Scene8Closing } from "./scenes/Scene8Closing";
import { AudioTrack } from "./AudioTrack";
import { colors, SCENE_FRAMES, TRANSITION } from "./theme";

const timing = linearTiming({ durationInFrames: TRANSITION });

export const MainVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.navyDeep }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES[0]}>
          <Scene1Opening />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />

        <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES[1]}>
          <Scene2Problem />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={timing}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES[2]}>
          <Scene3Solution />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />

        <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES[3]}>
          <Scene4Platform />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={timing}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES[4]}>
          <Scene5AdminDashboard />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={timing}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES[5]}>
          <Scene6Voting />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />

        <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES[6]}>
          <Scene7Results />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />

        <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES[7]}>
          <Scene8Closing />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      <AudioTrack />
    </AbsoluteFill>
  );
};