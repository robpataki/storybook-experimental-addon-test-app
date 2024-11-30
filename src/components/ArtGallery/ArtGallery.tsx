"use client";
import { useRef, useState } from "react";

import { AsciiArtFrame } from "@/components/AsciiArtFrame/AsciiArtFrame";
import { Outcome } from "@/components/Outcome/Outcome";
import styles from "./ArtGallery.module.css";
import { Artwork } from "@/shared/constants";

type ArtGalleryProps = {
  outcomeText: string;
  todaysArtworks: Artwork[];
  isItFriday: boolean;
};

export const ArtGallery = (props: ArtGalleryProps) => {
  const { outcomeText, todaysArtworks, isItFriday } = props;
  const [todaysArtwork, setTodaysArtwork] = useState<Artwork | undefined>();
  const artworkIndex = useRef(0);

  const rotateArtwork = () => {
    artworkIndex.current =
      artworkIndex.current < todaysArtworks.length - 1
        ? artworkIndex.current + 1
        : 0;
    setTodaysArtwork(todaysArtworks[artworkIndex.current]);
  };

  if (!todaysArtwork) {
    setTodaysArtwork(todaysArtworks[artworkIndex.current]);
  }

  return (
    <div className={styles.wrapper}>
      <h1 className="sr-only">Hey Mike, is it Friday yet?</h1>
      <Outcome isPositive={isItFriday}>{outcomeText}</Outcome>
      {todaysArtwork ? (
        <AsciiArtFrame
          asciiArt={todaysArtwork?.photo}
          onClick={rotateArtwork}
        />
      ) : null}
    </div>
  );
};

export default ArtGallery;
