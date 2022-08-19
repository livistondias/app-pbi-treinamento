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
export class AppComponent implements OnInit {

  public embedConfiguration: any;
  public workspaceid: string;
  public reportid: string;
  public pageName: string;
  public email: string;
  public disableButton = false;

  constructor(private service: PowerBiService) { }
  ngOnInit(): void {

  }

  onSubmit(event: any) {
    this.disableButton = true;
    if (!this.email)
      this.email = '';
    this.service.getReportEmbedToken(this.workspaceid, this.reportid, this.email).subscribe(
      result => {
        this.embedConfiguration = result;
        if (this.pageName)
          this.embedConfiguration.pageName = this.pageName;
        this.showReport();
        this.disableButton = false;
      },
      error => {
        alert('Erro ao buscar os dados');
        this.disableButton = false;
        console.log(error)
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
          filterPaneEnabled: true,
          navContentPaneEnabled: true,
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
