import { escape } from '@microsoft/sp-lodash-subset';
import * as React from 'react';
import { IQuickStartProps } from './IQuickStartProps';
import styles from './QuickStart.module.scss';

export default function QuickStart(props: IQuickStartProps) {

    return (
      <div className={ styles.quickStart }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(props.description)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
}
