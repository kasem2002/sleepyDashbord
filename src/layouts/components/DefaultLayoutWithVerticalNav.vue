<script lang="ts" setup>
import navItems from '@/navigation/vertical'
import { useThemeConfig } from '@core/composable/useThemeConfig'
import NavBarNotifications from './NavBarNotifications.vue'

// Components
import NavbarThemeSwitcher from '@/layouts/components/NavbarThemeSwitcher.vue'
import UserProfile from '@/layouts/components/UserProfile.vue'

// @layouts plugin
import { useTableStore } from '@/stores/AppTableStore'
import { VerticalNavLayout } from '@layouts'

const { appRouteTransition, isLessThanOverlayNavBreakpoint } = useThemeConfig()
const { width: windowWidth } = useWindowSize()
const tableStore = useTableStore()
const title = computed(() => tableStore.title)
</script>

<template>
  <VerticalNavLayout :nav-items="navItems">
    <!-- 👉 navbar -->
    <template #navbar="{ toggleVerticalOverlayNavActive }">
      <div class="d-flex h-100 align-center">
        <IconBtn v-if="isLessThanOverlayNavBreakpoint(windowWidth)" id="vertical-nav-toggle-btn" class="ms-n3"
          @click="toggleVerticalOverlayNavActive(true)">
          <VIcon size="26" icon="tabler-menu-2" />
        </IconBtn>
        <h1 class="text-h4 font-weight-regular">
          {{ title ?? "نظام الدعم الفني" }}
        </h1>

        <VSpacer />
        <NavbarThemeSwitcher class="ml-5" />
        <NavBarNotifications class="ml-5" />

        <UserProfile />
      </div>
    </template>

    <!-- 👉 Pages -->
    <RouterView v-slot="{ Component }" class="mt-5">
      <Component :is="Component" />
    </RouterView>

    <!-- 👉 Footer -->

    <template #footer>
      <Footer />
    </template>

    <!-- 👉 Customizer -->
    <!-- <TheCustomizer /> -->
  </VerticalNavLayout>
</template>
