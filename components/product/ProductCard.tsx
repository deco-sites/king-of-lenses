import Image from "deco-sites/std/components/Image.tsx";
import Avatar from "$store/components/ui/Avatar.tsx";
import WishlistIcon from "$store/islands/WishlistButton.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import { formatPrice } from "$store/sdk/format.ts";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";
import { SendEventOnClick } from "$store/sdk/analytics.tsx";
import type { Product } from "deco-sites/std/commerce/types.ts";

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;
  layout?: {
    basics?: {
      contentAlignment?: "Left" | "Center";
      oldPriceSize?: "Small" | "Normal";
      ctaText?: string;
    };
    elementsPositions?: {
      skuSelector?: "Top" | "Bottom";
      favoriteIcon?: "Top right" | "Top left";
    };
    hide: {
      productName?: boolean;
      productDescription?: boolean;
      allPrices?: boolean;
      installments?: boolean;
      skuSelector?: boolean;
      cta?: boolean;
    };
    onMouseOver?: {
      image?: "Change image" | "Zoom image";
      showFavoriteIcon?: boolean;
      showSkuSelector?: boolean;
      showCardShadow?: boolean;
      showCta?: boolean;
    };
  };
}

const relative = (url: string) => {
  const link = new URL(url);
  return `${link.pathname}${link.search}`;
};

const WIDTH = 252;
const HEIGHT = 252;

function ProductCard({ product, preload, itemListName, layout }: Props) {
  const {
    url,
    productID,
    image: images,
    offers,
    isVariantOf,
  } = product;

  const name = product?.isVariantOf?.name ?? product?.name;
  const id = `product-card-${productID}`;
  const productGroupID = isVariantOf?.productGroupID;
  const [front, back] = images ?? [];
  const { listPrice, price, installments } = useOffer(offers);
  const possibilities = useVariantPossibilities(product);
  const variants = Object.entries(Object.values(possibilities)[0] ?? {});

  const l = layout;
  const align =
    !l?.basics?.contentAlignment || l?.basics?.contentAlignment == "Left"
      ? "left"
      : "center";
  const skuSelector = variants.map(([value, [link]]) => (
    <li>
      <a href={link}>
        <Avatar
          variant={link === url ? "active" : "default"}
          content={value}
        />
      </a>
    </li>
  ));
  const cta = (
    <a
      href={url && relative(url)}
      aria-label="view product"
      class="btn mx-auto btn-primary btn-sm px-6"
    >
      {l?.basics?.ctaText || "Ver produto"}
    </a>
  );

  return (
    <div
      id={id}
      class={`card card-compact group w-full ${
        align === "center" ? "text-center" : "text-start"
      } ${
        l?.onMouseOver?.showCardShadow
          ? "lg:hover:border-[#818281] border-[1px] border-transparent transition-colors"
          : ""
      }`}
      data-deco="view-product"
    >
      <SendEventOnClick
        id={id}
        event={{
          name: "select_item" as const,
          params: {
            item_list_name: itemListName,
            items: [
              mapProductToAnalyticsItem({
                product,
                price,
                listPrice,
              }),
            ],
          },
        }}
      />
      <figure
        class="relative overflow-hidden"
        style={{ aspectRatio: `${WIDTH} / ${HEIGHT}` }}
      >
        {/* Wishlist button */}
        <div
          class={`absolute top-2 z-10
          ${
            l?.elementsPositions?.favoriteIcon === "Top left"
              ? "left-2"
              : "right-2"
          }
          ${
            l?.onMouseOver?.showFavoriteIcon
              ? "lg:hidden lg:group-hover:block"
              : "lg:hidden"
          }
        `}
        >
          <WishlistIcon
            productGroupID={productGroupID}
            productID={productID}
          />
        </div>
        {/* Product Images */}
        <a
          href={url && relative(url)}
          aria-label="view product"
          class="contents"
        >
          <Image
            src={front.url!}
            alt={front.alternateName}
            width={WIDTH}
            height={HEIGHT}
            class={`
              absolute rounded w-full
              ${
              (!l?.onMouseOver?.image ||
                  l?.onMouseOver?.image == "Change image")
                ? "duration-100 transition-opacity opacity-100 lg:group-hover:opacity-0"
                : ""
            }
              ${
              l?.onMouseOver?.image == "Zoom image"
                ? "duration-100 transition-scale scale-100 lg:group-hover:scale-110"
                : ""
            }
            `}
            sizes="(max-width: 640px) 50vw, 20vw"
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            decoding="async"
          />
          {(!l?.onMouseOver?.image ||
            l?.onMouseOver?.image == "Change image") && (
            <Image
              src={back?.url ?? front.url!}
              alt={back?.alternateName ?? front.alternateName}
              width={WIDTH}
              height={HEIGHT}
              class="absolute transition-opacity rounded w-full opacity-0 lg:group-hover:opacity-100"
              sizes="(max-width: 640px) 50vw, 20vw"
              loading="lazy"
              decoding="async"
            />
          )}
        </a>
      </figure>
      {/* Prices & Name */}
      <div class="flex-auto flex flex-col p-2 gap-3 lg:gap-4">
        {/* SKU Selector */}
        {(!l?.elementsPositions?.skuSelector ||
          l?.elementsPositions?.skuSelector === "Top") && (
          <>
            {l?.hide.skuSelector ? "" : (
              <ul
                class={`flex items-center gap-2 w-full ${
                  align === "center" ? "justify-center" : "justify-start"
                } ${l?.onMouseOver?.showSkuSelector ? "lg:hidden" : ""}`}
              >
                {skuSelector}
              </ul>
            )}
          </>
        )}

        {l?.hide.productName && l?.hide.productDescription
          ? ""
          : (
            <div class="flex flex-col gap-0">
              {l?.hide.productName
                ? ""
                : (
                  <h2 class="truncate text-base lg:text-lg text-base-content">
                    {name}
                  </h2>
                )}
              {l?.hide.productDescription
                ? ""
                : (
                  <p class="truncate text-sm lg:text-sm text-neutral">
                    {product.description}
                  </p>
                )}
            </div>
          )}
        {l?.hide.allPrices ? "" : (
          <div class="flex flex-col gap-2">
            <div
              class={`flex flex-col gap-0 ${
                l?.basics?.oldPriceSize === "Normal"
                  ? "lg:flex-row lg:gap-2"
                  : ""
              } ${align === "center" ? "justify-center" : "justify-start"}`}
            >
              <div
                class={`line-through text-base-300 text-xs ${
                  l?.basics?.oldPriceSize === "Normal" ? "lg:text-xl" : ""
                }`}
              >
                {formatPrice(listPrice, offers!.priceCurrency!)}
              </div>
              <div class="text-[18px] lg:text-xl font-bold text-neutral-900">
                {formatPrice(price, offers!.priceCurrency!)}
              </div>
            </div>
            {l?.hide.installments
              ? ""
              : (
                <div class="text-base-300 text-sm lg:text-base">
                  ou {installments}
                </div>
              )}
          </div>
        )}

        {/* SKU Selector */}
        {l?.elementsPositions?.skuSelector === "Bottom" && (
          <>
            {l?.hide.skuSelector ? "" : (
              <ul
                class={`flex items-center gap-2 w-full ${
                  align === "center" ? "justify-center" : "justify-start"
                } ${l?.onMouseOver?.showSkuSelector ? "lg:hidden" : ""}`}
              >
                {skuSelector}
              </ul>
            )}
          </>
        )}

        {!l?.hide.cta
          ? (
            <div
              class={`flex-auto flex items-end transition-opacity opacity-0 lg:group-hover:opacity-100 ${
                l?.onMouseOver?.showCta ? "hidden" : ""
              }`}
            >
              {cta}
            </div>
          )
          : ""}
      </div>
    </div>
  );
}

export default ProductCard;
