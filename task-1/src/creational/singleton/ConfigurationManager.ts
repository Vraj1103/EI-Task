import { Singleton } from "./Singleton";

export function configurationManagerUseCase() {
  const config1 = Singleton.getInstance();
  console.log(`Config1 Data: ${config1.getData()}`);

  const config2 = Singleton.getInstance();
  config2.setData("Updated Config Data");

  console.log(`Config1 Data after update: ${config1.getData()}`); // Should reflect updated data
}
