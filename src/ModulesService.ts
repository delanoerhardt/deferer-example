import { MakeAppServiceDeferer } from "./AppServiceDeferer";

const mockList = ["Primeiro", "Segundo"];

class AppService {
  static requestList(): Promise<String[]> {
    return new Promise<String[]>((resolve) => {
      setTimeout(() => resolve(mockList), 2000);
    });
  }
}

export default MakeAppServiceDeferer(AppService);
