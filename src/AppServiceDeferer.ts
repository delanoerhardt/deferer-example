import Deferer from "./Deferer";

export const AppServiceDeferer = new Deferer();

export const MakeAppServiceDeferer = <T extends object>(service: T): T =>
  new Proxy<T>(service, AppServiceDeferer);
