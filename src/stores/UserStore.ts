export const useUserStore = defineStore("users", () => {
  const refreshKey = ref(0);

  const myPermissions = computed<any[]>({
    get() {
      const myPermissionsData = localStorage.getItem("myPermissions");
      if (myPermissionsData) return JSON.parse(myPermissionsData);

      return [] as any[];
    },
    set(value) {
      localStorage.setItem("myPermissions", JSON.stringify(value));
    },
  });

  const user = computed<User>({
    get() {
      const userData = localStorage.getItem("userData");
      if (userData) return JSON.parse(userData);

      return {} as User;
    },
    set(value) {
      localStorage.setItem("userData", JSON.stringify(value));
    },
  });

  const accessToken = computed<string>({
    get() {
      return user.value.token;
    },
    set(value) {
      user.value.token = value;
    },
  });

  const setUser = (value: User) => {
    user.value = value;
  };

  const setRolePermissions = (value: any[]) => {
    myPermissions.value = value;
  };

  const logout = () => {
    user.value = {} as User;
    myPermissions.value = [] as any[];
    localStorage.removeItem("userData");
    localStorage.removeItem("accessToken");
  };

  const havePermission = (permission?: Array<string>) => {
    // console.log(permission);
    const isIncludes = permission.includes(user.value.role);
    return true;
  };

  return {
    user,
    setUser,
    accessToken,
    logout,
    myPermissions,
    setRolePermissions,
    havePermission,
    refreshKey,
  };
});
interface User {
  id: string;
  fullName: string;
  email: string;
  token: string;
  role: string;
  officeId?: string;
}
