import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';
import './index.css';
import styles from './styles.module.scss';

import {
  SPHttpClient,
  SPHttpClientResponse
} from '@microsoft/sp-http';

import {
  Environment,
  EnvironmentType
} from '@microsoft/sp-core-library';

import { escape } from '@microsoft/sp-lodash-subset';

import * as strings from 'HeaderApplicationCustomizerStrings';
const LOG_SOURCE: string = 'HeaderApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IHeaderApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
  Top: string;
  Bottom: string;
  TopDescription: string;
  logoImg: string;
}

export interface ISPLists {
  value: ISPList[];
}

export interface ISPList {
  Title: string;
  link: string;
}


/** A Custom Action which can be run during execution of a Client Side Application */
export default class HeaderApplicationCustomizer
  extends BaseApplicationCustomizer<IHeaderApplicationCustomizerProperties> {

  private _topPlaceholder: PlaceholderContent | undefined;
  private _bottomPlaceholder: PlaceholderContent | undefined;


  //to get the  data for Api list items
  private _getListData(): Promise<ISPLists> {
    return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + "/_api/web/lists/getbytitle('Navigation MLA')/items", SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      });
  }

  private _renderListAsync(): void {

    if (Environment.type == EnvironmentType.SharePoint ||
      Environment.type == EnvironmentType.ClassicSharePoint) {
      this._getListData()
        .then((response) => {
          this._renderList(response.value);
        });
    }
  }



  //To store the data into te Html list
  private _renderList(items: ISPList[]): void {

    //Change Json Format
    const list = items;


    console.log("listlist", list)
    //Navigation Bar
    let html: string = `<ul class="${styles.Navigation}" id="ParenrtNav">`;
    list.forEach((item) => {
      html += `          
       <li class="${styles.drop}">
       <a href=${item.link}><div class="${styles.navigationList}">${item.Title}</div>
       </li>
        `;
    });
    html += '</ul>';



    const listContainer: Element = document.getElementById('navigationList');
    listContainer.innerHTML = html;


  }

  @override

  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    let message: string = this.properties.testMessage;
    if (!message) {
      message = '(No properties were provided.)';
    }

    // Dialog.alert(`Hello from ${strings.Title}:\n\n${message}`).catch(() => {
    //   /* handle error */
    // });
    this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHolders);
    this._renderPlaceHolders();
    this._renderListAsync();
    return Promise.resolve();
  }

  private _renderPlaceHolders(): void {
    // console.log('Available placeholders are : ',
    // this.context.placeholderProvider.placeholderNames.map(placeholdername =>PlaceholderName[placeholdername]).join(', '));

    if (!this._topPlaceholder) {
      this._topPlaceholder =
        this.context.placeholderProvider.tryCreateContent(
          PlaceholderName.Top,
          { onDispose: this._onDispose });

      if (!this._topPlaceholder) {
        console.error('The placeholder Top was not found...');
        return;
      }

      if (this.properties) {
        let topString: string = this.properties.Top;
        let topStringDescription: string = this.properties.TopDescription;
        let logoImage: string = this.properties.logoImg;
        if (!topString) {
          topString = 'PerFormance Metrics Dashboard';
          topStringDescription = 'MANUFACTURING';
          logoImage = require('./assets/Logo.png');
        }

        if (this._topPlaceholder.domElement) {
          this._topPlaceholder.domElement.innerHTML = `
            <div class="${styles.acdemoapp}">
            <div class="${styles.header}">
            <div class="${styles.headertitle}">
            <div class="${styles.headerlogo}">
            <div class="${styles.img}"><img src="${escape(logoImage)}" alt="${escape(topString)}"></div> 
            <div class="${styles.topPlaceholder}">
            <div>${escape(topString)}</div>
            </div>
            </div>
            </div>
            <div  id="navigationList">
            </div>
            </div>
            </div>
            `;
        }

      }
    }

    if (!this._bottomPlaceholder) {
      this._bottomPlaceholder =
        this.context.placeholderProvider.tryCreateContent(
          PlaceholderName.Bottom,
          { onDispose: this._onDispose });

      if (!this._bottomPlaceholder) {
        console.error('The placeholder bottom was not found...');
        return;
      }

      if (this.properties) {
        let bottomString: string = this.properties.Bottom;
        if (!bottomString) {
          bottomString = '(Bottom property was not defined...)';
        }

        if (this._bottomPlaceholder.domElement) {
          this._bottomPlaceholder.domElement.innerHTML = `
            <div class="${styles.acdemoapp}">
            <div class="ms-bgColor-themeDark ms-fontColor-white ${styles.bottomPlaceholder}">
            <i class="ms-Icon ms-Icon--Info" aria-hidden="true"></i>
            </div>
            </div>
            `;
        }

      }
    }


  }

  private _onDispose(): void {
    // console.log('Disposed custom top and bottom placeholders');
  }
}
