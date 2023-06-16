import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface BannerTextButton {
  /** @description text to be rendered on top of the text */
  title?: string;
  /** @description Text to be rendered after the title */
  text: string;
  /** @description text to be rendered on CTA */
  textCTA?: string;
  /** @description href where the button will send to */
  href?: string;
  /** @description justify and align the text (MOBILE ONLY)*/
  textAlign?: "right" | "left";
  image: {
    /** @description Image for big screens */
    desktop: LiveImage;
    /** @description Image for small screens */
    mobile: LiveImage;
    /** @description image alt text */
    alt?: string;
    /** @description image align (DESKTOP ONLY)*/
    imageAlign?: "right" | "left";
    /** @description image height (DESKTOP ONLY)*/
    imageHeight?: number;
  };
}

function BannerTextButton(
  { text, href, textAlign, title, textCTA, image }: BannerTextButton,
) {
  return (
    <div class="lg:flex my-5 lg:max-w-[1470px] lg:m-auto">
      <div
        class={`flex flex-col ${
          textAlign === "left"
            ? "pr-12 pl-4 items-start"
            : "pr-4 pl-12 items-end"
        } ${
          image?.imageAlign === "left"
            ? "lg:pl-12 lg:pr-4 lg:order-1 lg:items-start"
            : "lg:pr-12 lg:pl-4 lg:items-end"
        } lg:m-auto lg:max-w-[700px]`}
      >
        {title && (
          <h1 class="text-xl text-titleText font-bold lg:mt-6 lg:text-[32px]">
            {title}
          </h1>
        )}
        <p
          class={`${
            textAlign === "left" ? "text-start" : "text-end"
          } text-comomText text-base mt-[10px] lg:mt-6 lg:text-[16px] ${
            image?.imageAlign === "left" ? "lg:text-start" : "lg:text-end"
          }`}
        >
          {text}
        </p>
        <a
          href={href}
          class="border px-3 py-2 rounded-[50px] bg-headers block w-fit my-6"
        >
          <button class="text-neutral-50 uppercase font-bold text-sm py-1 px-6 lg:text-[16px]">
            {textCTA ?? `Button`}
          </button>
        </a>
      </div>
      <Picture
        preload
        class="lg:min-w-1/2 lg:m-auto lg:w-1/2 col-start-1 col-span-1 row-start-1 row-span-1"
      >
        <Source
          src={image?.mobile}
          width={360}
          height={165}
          media="(max-width: 767px)"
        />
        <Source
          src={image?.desktop}
          width={770}
          height={image?.imageHeight ?? 529}
          media="(min-width: 767px)"
        />
        <img class="w-full" src={image?.desktop} alt={image?.alt ?? title} />
      </Picture>
    </div>
  );
}

export default BannerTextButton;
