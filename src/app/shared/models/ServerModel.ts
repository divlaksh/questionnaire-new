
export interface ServerModel {
  id?: string;
  vendor?: number;
  antiMalwareAgent?: string;
  hostIpsOnServers?: boolean;
  hostFirewallOnServers?: boolean;
  noOfConsoles?: string;
  serverFactor?: string;
  serverSupported?: string;
  hipsEffort?: string;
  hipsFwEffort?: string;
  noOfConsoleEffort?: string;
  fteRoundOff?: number;
  fteForCalculation?: string;
  serverFactorBaseFte?: string;
  serverSupportedBaseFte?: string;
  hipsEffortBaseFte?: string;
  hipsFwEffortBaseFte?: string;
  noOfConsoleEffortBaseFte?: string;
  fteRoundOffBaseFte?: string;
  fteForCalculationBaseFte?: string;
  serverFactorFinalFte?: string;
  serverSupportedFinalFte?: number;
  hipsEffortFinalFte?: string;
  hipsFwEffortFinalFte?: string;
  noOfConsoleEffortFinalFte?: string;
  fteRoundOffFinalFte?: string;
  fteForCalculationFinalFte?: string;
}
