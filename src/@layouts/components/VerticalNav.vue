<script lang="ts" setup>
import { useUserStore } from "@/stores/UserStore";
import { injectionKeyIsVerticalNavHovered, useLayouts } from "@layouts";
import {
  VerticalNavGroup,
  VerticalNavLink,
  VerticalNavSectionTitle,
} from "@layouts/components";
import type {
  NavGroup,
  NavLink,
  NavSectionTitle,
  VerticalNavItems,
} from "@layouts/types";
import type { Component } from "vue";
import { PerfectScrollbar } from "vue3-perfect-scrollbar";

const props = withDefaults(defineProps<Props>(), {
  tag: "aside",
});

const { havePermission } = useUserStore();

interface Props {
  tag?: string | Component;
  navItems: VerticalNavItems;
  isOverlayNavActive: boolean;
  toggleIsOverlayNavActive: (value: boolean) => void;
}

const refNav = ref();

const { width: windowWidth } = useWindowSize();

const isHovered = useElementHover(refNav);

provide(injectionKeyIsVerticalNavHovered, isHovered);

const {
  isVerticalNavCollapsed: isCollapsed,
  isLessThanOverlayNavBreakpoint,
  isVerticalNavMini,
  isAppRtl,
} = useLayouts();

const hideTitleAndIcon = isVerticalNavMini(windowWidth, isHovered);

const resolveNavItemComponent = (
  item: NavLink | NavSectionTitle | NavGroup
) => {
  if ("heading" in item) return VerticalNavSectionTitle;
  if ("children" in item) return VerticalNavGroup;

  return VerticalNavLink;
};

/*
  ℹ️ Close overlay side when route is changed
  Close overlay vertical nav when link is clicked
*/
const route = useRoute();

watch(
  () => route.name,
  () => {
    props.toggleIsOverlayNavActive(false);
  }
);

const isVerticalNavScrolled = ref(false);
const updateIsVerticalNavScrolled = (val: boolean) =>
  (isVerticalNavScrolled.value = val);

const handleNavScroll = (evt: Event) => {
  isVerticalNavScrolled.value = (evt.target as HTMLElement).scrollTop > 0;
};
</script>

<template>
  <Component :is="props.tag" ref="refNav" class="layout-vertical-nav bg-secondary" dark :class="[
    {
      'overlay-nav': isLessThanOverlayNavBreakpoint(windowWidth),
      hovered: isHovered,
      visible: isOverlayNavActive,
    },
  ]">
    <div id="border-radius-top" />
    <!-- 👉 Header -->
    <div class="nav-header p-0 m-0 mt-5 align-center d-flex">
      <slot name="nav-header">
        <RouterLink to="/"
          class="app-logo d-flex align-center justify-center text-center align-center app-title-wrapper mb-5 bg-whiste">
          <!-- <VNodeRenderer :nodes="config.app.logo" /> -->
          <img src="/logo.svg" style="height: 50px; object-fit: contain" class="" />
          <h1 class="leading-normal font-weight-light text-white mx-3 text-center">
            نظام الدعم الفني
          </h1>
        </RouterLink>
      </slot>
    </div>
    <slot name="before-nav-items">
      <div class="vertical-nav-items-shadow" />
    </slot>
    <VDivider class="v-theme--dark my-3" />
    <slot name="nav-items" :update-is-vertical-nav-scrolled="updateIsVerticalNavScrolled">
      <PerfectScrollbar :key="isAppRtl" tag="ul" class="nav-items mt-2" :options="{ wheelPropagation: false }"
        @ps-scroll-y="handleNavScroll">
        <template v-for="(item, index) in navItems">
          <Component :is="resolveNavItemComponent(item)" v-if="havePermission(item.role)" :key="index" :item="item" />
        </template>
      </PerfectScrollbar>
    </slot>
  </Component>
</template>

<style lang="scss">
@use "@configured-variables" as variables;
@use "@layouts/styles/mixins";

// 👉 Vertical Nav
.layout-vertical-nav {
  position: fixed;
  z-index: variables.$layout-vertical-nav-z-index;
  display: flex;
  flex-direction: column;
  block-size: 100%;
  inline-size: variables.$layout-vertical-nav-width;
  inset-block-start: 0;
  inset-inline-start: 0;
  transition: transform 0.25s ease-in-out, inline-size 0.25s ease-in-out,
    box-shadow 0.25s ease-in-out;
  will-change: transform, inline-size;

  .nav-header {
    display: flex;
    align-items: center;

    .header-action {
      cursor: pointer;
    }
  }

  .app-title-wrapper {
    margin-inline-end: auto;
  }

  .nav-items {
    block-size: 100%;

    // ℹ️ We no loner needs this overflow styles as perfect scrollbar applies it
    // overflow-x: hidden;

    // // ℹ️ We used `overflow-y` instead of `overflow` to mitigate overflow x. Revert back if any issue found.
    // overflow-y: auto;
  }

  .nav-item-title {
    overflow: hidden;
    margin-inline-end: auto;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  // 👉 Collapsed
  .layout-vertical-nav-collapsed & {
    &:not(.hovered) {
      inline-size: variables.$layout-vertical-nav-collapsed-width;
    }
  }

  // 👉 Overlay nav
  &.overlay-nav {
    &:not(.visible) {
      transform: translateX(-#{variables.$layout-vertical-nav-width});

      @include mixins.rtl {
        transform: translateX(variables.$layout-vertical-nav-width);
      }
    }
  }
}
</style>
