import type { HorizontalNavItems } from "@layouts/types";

export default [
  {
    title: "المستخدمين",
    to: { name: "users" },
    icon: { icon: "tabler-users" },
    role: ["issuer"],

    // permission: 'users.get-all',
  },
  {
    title: "الاغاني",
    to: { name: "musics" },
    icon: { icon: "tabler-music" },
    role: ["issuer"],

    // permission: 'users.get-all',
  },
  {
    title: "الاقسام",
    to: { name: "categorys" },
    icon: { icon: "tabler-category" },
    role: ["issuer"],

    // permission: 'users.get-all',
  },
  {
    title: "الضوايط ",
    to: { name: "role" },
    icon: { icon: "tabler-password" },
    role: ["issuer"],
  },
] as HorizontalNavItems;
