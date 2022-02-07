import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  ConsoleListener, Logger
} from "@pnp/logging";
import * as strings from 'QuickStartWebPartStrings';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { IQuickStartProps } from './components/IQuickStartProps';
import QuickStart from './components/QuickStart';

export interface IQuickStartWebPartProps {
  description: string;
  logLevel?: number;
}
const LOG_SOURCE = 'QuickStartWebPart';

export default class QuickStartWebPart extends BaseClientSideWebPart<IQuickStartWebPartProps> {

  public  onInit(): Promise<void> {
    Logger.subscribe(new ConsoleListener());
    if (this.properties.logLevel && this.properties.logLevel in [0, 1, 2, 3, 99]) {
      Logger.activeLogLevel = this.properties.logLevel;
    }
    Logger.write(`${LOG_SOURCE} Initialized QuickStartWebPart`); 
    
    return Promise.resolve();
  }
  public render(): void {
    const element: React.ReactElement<IQuickStartProps> = React.createElement(
      QuickStart,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
