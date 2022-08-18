import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  OnChanges
} from '@angular/core';
import * as pbi from 'powerbi-client';
import { BackgroundType, LayoutType } from 'powerbi-models';
import { PowerBiService } from './powerbi/powerbi.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
 
  public embedConfiguration: any;


  constructor(private service: PowerBiService) { }
  ngOnInit(): void {
    this.service.getReportEmbedToken('07c9412d-dda6-40a0-8d90-a32ff04eca96','0ae58b30-a04e-4ab0-8332-4eb9f6dbda20','').subscribe(
      result => {
        this.embedConfiguration = result;
        //this.embedConfiguration.pageName = '3680f7c6020d9ce0003d';       
        //this.embedConfiguration.pageName = '2712ed1d-e298-420a-a519-41069eb15c0a';   
        this.embedConfiguration.pageName = 'ReportSection4b3fbaa7dd7908d906d9';   
        console.log(this.embedConfiguration);
        this.showReport();         
      },
      error => {
        
      }
    );
  }

  // ngOnChanges() {
  //   this.showReport();
  //   console.log(this.embedConfiguration)
  // }

  showReport() {
    let layoutType = LayoutType.Master;    
    if (this.embedConfiguration) {

      // if ($(window).width() < 799) {
      //   layoutType = LayoutType.MobilePortrait;
      // }

      const config: pbi.IEmbedConfiguration = {
        type: 'report',
        tokenType: pbi.models.TokenType.Embed,
        accessToken: this.embedConfiguration.embedToken.token,
        embedUrl: this.embedConfiguration.embedUrl,
        id: this.embedConfiguration.id,
        permissions: pbi.models.Permissions.Read,
        pageName: this.embedConfiguration.pageName,
        pageView: 'fitToWidth',
        settings: {
          filterPaneEnabled: false,
          navContentPaneEnabled: false,          
          layoutType: layoutType
        }
      };

      const reportContainer = <HTMLElement>(
        document.getElementById('reportContainer')
      );

      const powerbi = new pbi.service.Service(
        pbi.factories.hpmFactory,
        pbi.factories.wpmpFactory,
        pbi.factories.routerFactory
      );
      powerbi.reset(reportContainer);
      powerbi.enableAutoEmbed();
      const report = powerbi.embed(reportContainer, config);
      report.off('loaded');
      report.on('loaded', function () { });
    }
  }
}
