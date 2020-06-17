
export interface WorkstationModel {
  id?: string;
  vendor?: number;
  antiMalwareAgent?: string;
  encryptionEndpoint?: boolean;
  hostIpsOnServers?: boolean;
  hostFirewallOnServers?: boolean;
  deviceApplicationControl?: boolean;
  noOfConsoles?: string;
  serverFactor?: string;
  serverSupported?: string;
  encryptionEffort?: string;
  hipsEffort?: string;
  hipsFwEffort?: string;
  deviceApplicationControlEffort?: string;
  noOfConsoleEffort?: string;
  fteRoundOff?: number;
  fteForCalculation?: string;
  serverFactorBaseFte?: string;
  serverSupportedBaseFte?: string;
  encryptionEffortBaseFte?: string;
  hipsEffortBaseFte?: string;
  hipsFwEffortBaseFte?: string;
  deviceApplicationControlBaseFte?: string;
  noOfConsoleEffortBaseFte?: string;
  fteRoundOffBaseFte?: string;
  fteForCalculationBaseFte?: string;
  serverFactorFinalFte?: string;
  serverSupportedFinalFte?: number;
  encryptionEffortFinalFte?: string;
  hipsEffortFinalFte?: string;
  hipsFwEffortFinalFte?: string;
  deviceApplicationControlFinalFte?: string;
  noOfConsoleEffortFinalFte?: string;
  fteRoundOffFinalFte?: string;
  fteForCalculationFinalFte?: string;
}
