import React from "react";
import { Composition } from "remotion";
import { DesignTest } from "./scenes/DesignTest";
import { MockupTest } from "./scenes/MockupTest";
import { Scene4Platform } from "./scenes/Scene4Platform";
import { Scene5AdminDashboard } from "./scenes/Scene5AdminDashboard";
import { Scene6Voting } from "./scenes/Scene6Voting";
import { Scene7Results } from "./scenes/Scene7Results";
import { Scene8Closing } from "./scenes/Scene8Closing";
import { MainVideo } from "./MainVideo";
import { SCENE_FRAMES, VIDEO } from "./theme";

const common = {
  fps: VIDEO.fps,
  width: VIDEO.width,
  height: VIDEO.height,
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="SmartVoteMain"
        component={MainVideo}
        durationInFrames={VIDEO.durationInFrames}
        {...common}
      />
      <Composition id="Scene4Test" component={Scene4Platform} durationInFrames={SCENE_FRAMES[3]} {...common} />
      <Composition id="Scene5Test" component={Scene5AdminDashboard} durationInFrames={SCENE_FRAMES[4]} {...common} />
      <Composition id="Scene6Test" component={Scene6Voting} durationInFrames={SCENE_FRAMES[5]} {...common} />
      <Composition id="Scene7Test" component={Scene7Results} durationInFrames={SCENE_FRAMES[6]} {...common} />
      <Composition id="Scene8Test" component={Scene8Closing} durationInFrames={SCENE_FRAMES[7]} {...common} />
      <Composition id="MockupTest" component={MockupTest} durationInFrames={300} {...common} />
      <Composition id="DesignTest" component={DesignTest} durationInFrames={150} {...common} />
    </>
  );
};