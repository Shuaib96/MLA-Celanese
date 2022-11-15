import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneChoiceGroup
} from '@microsoft/sp-property-pane';


import {
  PropertyFieldColorPicker,
  PropertyFieldColorPickerStyle
} from '@pnp/spfx-property-controls/lib/PropertyFieldColorPicker';

import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './BannerCardWebPart.module.scss';
import * as strings from 'BannerCardWebPartStrings';
import "./index.css"

export interface IBannerCardWebPartProps {
  //Banner Name
  bannerName: string;

  //Card 1
  headerOne: string;
  headerOneImg: string;
  headerOneRedirect: string;

  //Card 2
  headerTwo: string;
  headerTwoImg: string;
  headerTwoRedirect: string;

  //Card 3
  headerThree: string;
  headerThreeImg: string;
  headerThreeRedirect: string;

  //Card 4
  headerFour: string;
  headerFourImg: string;
  headerFourRedirect: string;

  //Card 5
  headerFive: string;
  headerFiveImg: string;
  headerFiveRedirect: string;

  //Card and Button background when hover
  bgcolor: string;

  //Background Color when it is change by PaneField without Hover
  InActivebgcolor: string;

  display: string;

  activestate: string;
}

export default class BannerCardWebPart extends BaseClientSideWebPart<IBannerCardWebPartProps> {

  // private _isDarkTheme: boolean = false;
  // private _environmentMessage: string = '';

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  public render(): void {
    this.domElement.innerHTML = `
     <div class="${styles.BannerCards}">
        <div class="${styles.container}">
        <div class="${styles.bannerName}">${this.properties.bannerName}</div>
          <div class="${styles.main}">
          <a href=${this.properties.headerOneRedirect}><div id="CardButton" class="${styles.headerBox}">
           <div class="${styles.imageHeader} "><img src=${this.properties.headerOneImg} alt="HeaderImage" /></div>
            <div class="${styles.headerLabel}"><p>${this.properties.headerOne}</p></div>
          </div></a>
          <a href=${this.properties.headerTwoRedirect}><div id="CardButtonOne" class="${styles.headerBox} ">
           <div class="${styles.imageHeader} "><img src=${this.properties.headerTwoImg} alt="HeaderImage" /></div>
            <div class="${styles.headerLabel}"><p>${this.properties.headerTwo}</p></div>
          </div></a>
          <a href=${this.properties.headerThreeRedirect}><div id="CardButtonTwo" class="${styles.headerBox} ">
           <div class="${styles.imageHeader} "><img src=${this.properties.headerThreeImg} alt="HeaderImage" /></div>
            <div class="${styles.headerLabel}"><p>${this.properties.headerThree}</p></div>
          </div></a>
          <a href=${this.properties.headerFourRedirect}><div id="CardButtonThree" class="${styles.headerBox} ">
           <div class="${styles.imageHeader} "><img src=${this.properties.headerFourImg} alt="HeaderImage" /></div>
            <div class="${styles.headerLabel}"><p>${this.properties.headerFour}</p></div>
          </div></a>
          <a href=${this.properties.headerFiveRedirect}><div id="CardButtonFour" class="${styles.headerBox} ">
           <div class="${styles.imageHeader} "><img src=${this.properties.headerFiveImg} alt="HeaderImage" /></div>
            <div class="${styles.headerLabel}"><p>${this.properties.headerFive}</p></div>
          </div></a>
          </div>
        </div>
      </div>
    `;
    this._setButtonEventHandlers();
  }

  private _setButtonEventHandlers(): void {
    const webPart: BannerCardWebPart = this;
    //For change background by the propertyPane
    this.domElement.querySelector('#CardButton').addEventListener('mouseenter', () => {
      this.domElement.querySelector<HTMLElement>("#CardButton").style.backgroundColor = this.properties.bgcolor;
    });
    this.domElement.querySelector('#CardButton').addEventListener('mouseleave', () => {
      this.domElement.querySelector<HTMLElement>("#CardButton").style.backgroundColor = this.properties.activestate == "one" ? this.properties.bgcolor : this.properties.InActivebgcolor;
    });

    this.domElement.querySelector('#CardButtonOne').addEventListener('mouseenter', () => {
      this.domElement.querySelector<HTMLElement>("#CardButtonOne").style.backgroundColor = this.properties.bgcolor;
    });
    this.domElement.querySelector('#CardButtonOne').addEventListener('mouseleave', () => {
      this.domElement.querySelector<HTMLElement>("#CardButtonOne").style.backgroundColor = this.properties.activestate == "two" ? this.properties.bgcolor : this.properties.InActivebgcolor;
    });
    this.domElement.querySelector('#CardButtonTwo').addEventListener('mouseenter', () => {
      this.domElement.querySelector<HTMLElement>("#CardButtonTwo").style.backgroundColor = this.properties.bgcolor;
    });
    this.domElement.querySelector('#CardButtonTwo').addEventListener('mouseleave', () => {
      this.domElement.querySelector<HTMLElement>("#CardButtonTwo").style.backgroundColor = this.properties.activestate == "three" ? this.properties.bgcolor : this.properties.InActivebgcolor;
    });
    this.domElement.querySelector('#CardButtonThree').addEventListener('mouseenter', () => {
      this.domElement.querySelector<HTMLElement>("#CardButtonThree").style.backgroundColor = this.properties.bgcolor;
    });
    this.domElement.querySelector('#CardButtonThree').addEventListener('mouseleave', () => {
      this.domElement.querySelector<HTMLElement>("#CardButtonThree").style.backgroundColor = this.properties.activestate == "four" ? this.properties.bgcolor : this.properties.InActivebgcolor;
    });
    this.domElement.querySelector('#CardButtonFour').addEventListener('mouseenter', () => {
      this.domElement.querySelector<HTMLElement>("#CardButtonFour").style.backgroundColor = this.properties.bgcolor;
    });
    this.domElement.querySelector('#CardButtonFour').addEventListener('mouseleave', () => {
      this.domElement.querySelector<HTMLElement>("#CardButtonFour").style.backgroundColor = this.properties.activestate == "five" ? this.properties.bgcolor : this.properties.InActivebgcolor;
    });
    this.domElement.querySelector<HTMLElement>("#CardButtonFour").style.display = this.properties.display;

    this.domElement.querySelector<HTMLElement>("#CardButton").style.backgroundColor = this.properties.activestate == "one" ? this.properties.bgcolor : this.properties.InActivebgcolor;
    this.domElement.querySelector<HTMLElement>("#CardButtonOne").style.backgroundColor = this.properties.activestate == "two" ? this.properties.bgcolor : this.properties.InActivebgcolor;
    this.domElement.querySelector<HTMLElement>("#CardButtonTwo").style.backgroundColor = this.properties.activestate =="three" ? this.properties.bgcolor : this.properties.InActivebgcolor;
    this.domElement.querySelector<HTMLElement>("#CardButtonThree").style.backgroundColor = this.properties.activestate == "four" ? this.properties.bgcolor : this.properties.InActivebgcolor;
    this.domElement.querySelector<HTMLElement>("#CardButtonFour").style.backgroundColor = this.properties.activestate == "five" ? this.properties.bgcolor : this.properties.InActivebgcolor;

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
              groupName: "Banner Name",
              groupFields: [

                PropertyPaneTextField('bannerName', {
                  label: "Edit Banner Name",
                  multiline: false,
                  resizable: false,
                  deferredValidationTime: 5000,
                  placeholder: "Please enter header name", "description": "Header Name property field"
                })
              ]
            },
            {
              groupName: "Card-1",
              groupFields: [

                PropertyPaneTextField('headerOne', {
                  label: "Header Name",
                  multiline: false,
                  resizable: false,
                  deferredValidationTime: 5000,
                  placeholder: "Please enter header name", "description": "Header Name property field"
                }),
                PropertyPaneTextField('headerOneImg', {
                  label: "Image Link",
                  multiline: false,
                  resizable: false,
                  deferredValidationTime: 5000,
                  placeholder: "Please enter image link", "description": "Header Name property field"
                }),
                PropertyPaneTextField('headerOneRedirect', {
                  label: "Redirect Link",
                  multiline: false,
                  resizable: false,
                  deferredValidationTime: 5000,
                  placeholder: "Please enter redirect link", "description": "Header Name property field"
                })
              ]
            },
            {
              groupName: "Card-2",
              groupFields: [

                PropertyPaneTextField('headerTwo', {
                  label: "Header Name",
                  multiline: false,
                  resizable: false,
                  deferredValidationTime: 5000,
                  placeholder: "Please enter header name", "description": "Header Name property field"
                }),
                PropertyPaneTextField('headerTwoImg', {
                  label: "Image Link",
                  multiline: false,
                  resizable: false,
                  deferredValidationTime: 5000,
                  placeholder: "Please enter image link", "description": "Header Name property field"
                }),
                PropertyPaneTextField('headerTwoRedirect', {
                  label: "Redirect Link",
                  multiline: false,
                  resizable: false,
                  deferredValidationTime: 5000,
                  placeholder: "Please enter redirect link", "description": "Header Name property field"
                })
              ]
            },
            {
              groupName: "Card-3",
              groupFields: [

                PropertyPaneTextField('headerThree', {
                  label: "Header Name",
                  multiline: false,
                  resizable: false,
                  deferredValidationTime: 5000,
                  placeholder: "Please enter header name", "description": "Header Name property field"
                }),
                PropertyPaneTextField('headerThreeImg', {
                  label: "Image Link",
                  multiline: false,
                  resizable: false,
                  deferredValidationTime: 5000,
                  placeholder: "Please enter image link", "description": "Header Name property field"
                }),
                PropertyPaneTextField('headerThreeRedirect', {
                  label: "Redirect Link",
                  multiline: false,
                  resizable: false,
                  deferredValidationTime: 5000,
                  placeholder: "Please enter redirect link", "description": "Header Name property field"
                })
              ]
            },
            {
              groupName: "Card-4",
              groupFields: [

                PropertyPaneTextField('headerFour', {
                  label: "Header Name",
                  multiline: false,
                  resizable: false,
                  deferredValidationTime: 5000,
                  placeholder: "Please enter header name", "description": "Header Name property field"
                }),
                PropertyPaneTextField('headerFourImg', {
                  label: "Image Link",
                  multiline: false,
                  resizable: false,
                  deferredValidationTime: 5000,
                  placeholder: "Please enter image link", "description": "Header Name property field"
                }),
                PropertyPaneTextField('headerFourRedirect', {
                  label: "Redirect Link",
                  multiline: false,
                  resizable: false,
                  deferredValidationTime: 5000,
                  placeholder: "Please enter redirect link", "description": "Header Name property field"
                })
              ]
            },
            {
              groupName: "Card-5",
              groupFields: [

                PropertyPaneTextField('headerFive', {
                  label: "Header Name",
                  multiline: false,
                  resizable: false,
                  deferredValidationTime: 5000,
                  placeholder: "Please enter header name", "description": "Header Name property field"
                }),
                PropertyPaneTextField('headerFiveImg', {
                  label: "Image Link",
                  multiline: false,
                  resizable: false,
                  deferredValidationTime: 5000,
                  placeholder: "Please enter image link", "description": "Header Name property field"
                }),
                PropertyPaneTextField('headerFiveRedirect', {
                  label: "Redirect Link",
                  multiline: false,
                  resizable: false,
                  deferredValidationTime: 5000,
                  placeholder: "Please enter redirect link", "description": "Header Name property field"
                })
              ]
            },
            {
              groupName: "Display-5(box)",
              groupFields: [

                PropertyPaneTextField('display', {
                  label: "Display",
                  multiline: false,
                  resizable: false,
                  deferredValidationTime: 5000,
                  placeholder: "Please enter display name", "description": "Display Name property field"
                })
              ]
            },
            {
              groupName: "Card Hover Effect",
              groupFields: [
                PropertyFieldColorPicker('InActivebgcolor', {
                  label: 'Background color without hover effect',
                  selectedColor: this.properties.InActivebgcolor,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  debounce: 1000,
                  isHidden: false,
                  alphaSliderHidden: false,
                  style: PropertyFieldColorPickerStyle.Full,
                  iconName: 'Precipitation',
                  key: 'colorFieldId'
                }),
                PropertyFieldColorPicker('bgcolor', {
                  label: 'Hover background color',
                  selectedColor: this.properties.bgcolor,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  debounce: 1000,
                  isHidden: false,
                  alphaSliderHidden: false,
                  style: PropertyFieldColorPickerStyle.Full,
                  iconName: 'Precipitation',
                  key: 'colorFieldId'
                })
              ]
            },
            {
              groupName: "Active State",
              groupFields: [
                PropertyPaneChoiceGroup('activestate', {
                  label: 'Choices active card',
                 options : [
                  {key: 'one', text: 'Card-1'},
                  {key: 'two', text: 'Card-2'},
                  {key: 'three', text: 'Card-3'},
                  {key: 'four', text: 'Card-4'},
                  {key: 'five', text: 'Card-5'},
                 ]
                })
              ]
            }
          ],
          displayGroupsAsAccordion: true
        }
      ]
    };
  }
}
