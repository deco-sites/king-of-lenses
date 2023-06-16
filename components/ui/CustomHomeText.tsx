function CustomHomeText() {
  return (
    <div class="flex flex-col gap-2 text-center tl items-start justify-start t-body c-on-base pl-[10px] pr-[10px] lg:items-center">
      <div class="text-2xl leading-8 lg:leading-10 text-base-content lg:text-4xl flex lg:w-full">
        <h1 class="t-heading-1 border-r pl-3 pr-3 text-sm lg:text-xl flex flex-col lg:flex-row lg:pr-[10px] lg:justify-end font-semibold w-1/2">
          <span>Lentes para</span>
          <span>Óculos de Sol</span>
        </h1>
        <p class="lh-copy border-l pl-[15px] pr-[15px] text-sm lg:text-xl lg:flex lg:pl-[10px] lg:justify-start w-1/2">
          <a
            href="/lentes-para-oculos-de-sol/oakley"
            class="font-semibold"
            title="Lentes para Oakley"
          >
            Oakley
          </a>,{" "}
          <a
            href="/lentes-para-oculos-de-sol/ray-ban"
            class="font-semibold"
            title="Lentes para Ray-Ban"
          >
            Ray-Ban
          </a>,{" "}
          <a
            href="/lentes-para-oculos-de-sol/mormaii"
            class="font-semibold"
            title="Lentes para Mormaii"
          >
            Mormaii
          </a>{" "}
          e{" "}
          <a
            href="/lentes-para-oculos-de-sol/evoke"
            class="font-semibold"
            title="Lentes para Evoke"
          >
            Evoke.
          </a>
        </p>
      </div>
    </div>
  );
}

export default CustomHomeText;
