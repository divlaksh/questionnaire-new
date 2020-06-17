import { Component, ViewChild, ElementRef,OnInit } from '@angular/core';
import jsPDF  from 'jspdf';

@Component({
  selector: 'app-customer-questionnaire',
  templateUrl: './customer-questionnaire.component.html',
  styleUrls: ['./customer-questionnaire.component.scss']
})
export class CustomerQuestionnaireComponent implements OnInit {


  solutionDesginers: any[] = [
    {id: 1, name: 'Priyadarshi Achar - AP'},
    {id: 2, name: 'David Lugg - Europe'},
    {id: 3, name: 'Julie Keane - Europe'},
    {id: 4, name: 'Marek Wolsan - Europe'},
    {id: 5, name: 'Steve Chow - Europe'},
    {id: 6, name: 'Kiyomi Miura - Japan'},
    {id: 7, name: 'Marcello Belloni Gomes - LA'},
    {id: 8, name: 'Greg Sinclair - MEA'},
    {id: 9, name: 'David Cunningham - NA'},
    {id: 10, name: 'Page Farmer - NA'},
    {id: 11, name: 'Gerry Comeau - WW'},
    {id: 12, name: 'Jonathan Planko - WW'},
    {id: 13, name: 'Other'}

];

serviceDeliveries: any[] = [
  {id: 1, name: 'North America'},
  {id: 2, name: 'Europe'},
  {id: 3, name: 'Asia/Pacific'},
  {id: 4, name: 'Latin America'},
  {id: 5, name: 'None'}

];

vendorList: any[] =[
  {id: 1, name: 'McAfee'},
  {id: 2, name: 'Symantec'},
  {id: 3, name: 'Symantec - Data Center Security'},
  {id: 4, name: 'Trend'},
  {id: 5, name: 'Sophos'},
  {id: 6, name: 'Microsoft Defender'},
  {id: 7, name: 'Forcepoint'},
  {id: 8, name: 'Fireeye'},
  {id: 9, name: 'IBM Bigfix'},
  {id: 10, name: 'Cisco AMP'},
  {id: 11, name: 'Digital Guardian - DLP'},
  {id: 12, name: 'Other, Descript below'}
];

productFeatures1: any[] = [
  {id: 1, name: 'Anti-virus/Anti-malware'},
  {id: 2, name: 'DLP on Workstations'},
  {id: 3, name: 'DLP on Servers'},
  {id: 4, name: 'Encryption on Workstations'},
  {id: 5, name: 'Encryption on Servers'},
  {id: 6, name: 'VDI'},
  {id: 7, name: 'Windows'},
  {id: 8, name: 'AIX'},
  {id: 9, name: 'Other'},
  {id: 10, name: 'If other, please explain'},
];

productFeatures2: any[] = [
  {id: 11, name: 'URL Filtering'},
  {id: 12, name: 'HIPS on Workstations'},
  {id: 13, name: 'HIPS on Servers'},
  {id: 14, name: 'Firewall on Workstations'},
  {id: 15, name: 'Firewall on Servers'},
  {id: 16, name: 'BigFix Patching/Scanning'},
  {id: 17, name: 'Linux'},
  {id: 18, name: 'Integrity Monitoring'},
  {id: 19, name: 'Citrix'},
];

serviceProviders : any[] = [
  {id: 1, name: 'AWS'},
  {id: 2, name: 'GCP'},
  {id: 3, name: 'Azure'},
  {id: 4, name: 'Other'}
];


@ViewChild('reportContent') reportContent: ElementRef;
  
downloadPdf() {
    const doc = new jsPDF();
    const specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };

    const content = this.reportContent.nativeElement;

    doc.fromHTML(content.innerHTML, 0, 0, {
      'width': 100,
      'elementHandlers': specialElementHandlers
    });

    doc.save('asdfghj' + '.pdf');
  }

  ngOnInit() {

  }
}
