import { MakeAppServiceDeferer } from "./AppServiceDeferer";

const mockName = "João";

class ClientService {
  static requestName(): Promise<String> {
    return new Promise<String>((resolve) => {
      setTimeout(() => resolve(mockName), 1000);
    });
  }
}

export default MakeAppServiceDeferer(ClientService);
