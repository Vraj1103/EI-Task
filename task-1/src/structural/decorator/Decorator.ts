import { Component } from "./Component";

export abstract class Decorator implements Component {
  protected component: Component;

  constructor(component: Component) {
    this.component = component;
  }

  abstract operation(): string;
}
