// import { BigNumber, type BigNumberish } from '@ethersproject/bignumber'
// import { V1ContractName } from '$jbx/models/v1/contracts'
// import type { V1FundingCycle } from '$jbx/models/v1/fundingCycle'
// import type { V1TerminalName } from '$jbx/models/v1/terminals'
// import { useCallback, useMemo } from 'react'
// import { deepEqFundingCycles } from '$jbx/utils/v1/deepEqFundingCycles'

// import useContractReader from './ContractReader'

/** Returns current funding cycle for project. */
// export default function useCurrentFundingCycleOfProject(
//   projectId: BigNumberish | undefined,
//   terminalName: V1TerminalName | undefined,
// ) {
//   return useContractReader<V1FundingCycle>({
//     contract: V1ContractName.FundingCycles,
//     functionName: 'currentOf',
//     args: projectId ? [BigNumber.from(projectId).toHexString()] : null,
//     valueDidChange: useCallback((a, b) => !deepEqFundingCycles(a, b), []),
//     updateOn:[
//               {
//                 contract: V1ContractName.FundingCycles,
//                 eventName: 'Configure',
//                 topics: [[], BigNumber.from(projectId).toHexString()],
//               },
//               {
//                 contract: terminalName,
//                 eventName: 'Pay',
//                 topics: [[], BigNumber.from(projectId).toHexString()],
//               },
//               {
//                 contract: terminalName,
//                 eventName: 'Tap',
//                 topics: [[], BigNumber.from(projectId).toHexString()],
//               },
//             ]
//   })
// }
