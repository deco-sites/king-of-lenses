import Image from "deco-sites/std/components/Image.tsx";
import { headerHeight } from "./constants.ts";

export interface INavItem {
  label: string;
  href: string;
  children?: INavItem[];
  image?: { src?: string; alt?: string };
  isLastItem?: boolean;
}

function NavItem({ item }: { item: INavItem }) {
  const { href, label, children, image } = item;

  return (
    <li class="group flex items-center">
      <a href={href} class="px-4 py-3">
        <span
          class={`${
            item?.isLastItem ? "text-promotion" : "text-neutral-50"
          } uppercase group-hover:underline`}
        >
          {label}
        </span>
      </a>

      {children && children.length > 0 &&
        (
          <div
            class="bg-headers uppercase fixed hidden hover:flex group-hover:flex z-50 items-start justify-center gap-6 border-t border-b-2 w-screen"
            style={{ top: "0px", left: "0px", marginTop: headerHeight }}
          >
            {image?.src && (
              <Image
                class="p-6"
                src={image.src}
                alt={image.alt}
                width={300}
                height={332}
                loading="lazy"
              />
            )}
            <ul class="flex items-start justify-center gap-6">
              {children.map((node) => (
                <li class="p-6">
                  <a
                    class="text-neutral-50 uppercase hover:underline"
                    href={node.href}
                  >
                    <span>{node.label}</span>
                  </a>

                  <ul class="flex flex-col gap-1 mt-4">
                    {node.children?.map((leaf) => (
                      <li>
                        <a class="hover:underline" href={leaf.href}>
                          <span class="text-xs text-neutral-50">
                            {leaf.label}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}
    </li>
  );
}

export default NavItem;
