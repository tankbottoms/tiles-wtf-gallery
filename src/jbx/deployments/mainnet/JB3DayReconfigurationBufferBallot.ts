export default {
  "address": "0x6060Fa6d5C5B7Bd219f2BC576992c239Da8f6664",
  "abi": [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_duration",
          "type": "uint256"
        },
        {
          "internalType": "contract IJBFundingCycleStore",
          "name": "_fundingCycleStore",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "projectId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "configuration",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "enum JBBallotState",
          "name": "ballotState",
          "type": "uint8"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "caller",
          "type": "address"
        }
      ],
      "name": "Finalize",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "duration",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "finalState",
      "outputs": [
        {
          "internalType": "enum JBBallotState",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_projectId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_configured",
          "type": "uint256"
        }
      ],
      "name": "finalize",
      "outputs": [
        {
          "internalType": "enum JBBallotState",
          "name": "ballotState",
          "type": "uint8"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "fundingCycleStore",
      "outputs": [
        {
          "internalType": "contract IJBFundingCycleStore",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_projectId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_configured",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_start",
          "type": "uint256"
        }
      ],
      "name": "stateOf",
      "outputs": [
        {
          "internalType": "enum JBBallotState",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes4",
          "name": "_interfaceId",
          "type": "bytes4"
        }
      ],
      "name": "supportsInterface",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ],
  "transactionHash": "0xa3a75d35cfb0aed5af02f6b1c39c0476f475212513c221b2028a865ae60310f0",
  "receipt": {
    "to": null,
    "from": "0xE9bE6df23C7f9CaBa3005DA2fa2d8714d340D0aF",
    "contractAddress": "0x6060Fa6d5C5B7Bd219f2BC576992c239Da8f6664",
    "transactionIndex": 68,
    "gasUsed": "455444",
    "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    "blockHash": "0x3d13c09f5522e9dfe22b92639e6ed4540c932a7311744616e7283946aa5b6f69",
    "transactionHash": "0xa3a75d35cfb0aed5af02f6b1c39c0476f475212513c221b2028a865ae60310f0",
    "logs": [],
    "blockNumber": 14844430,
    "cumulativeGasUsed": "5609455",
    "status": 1,
    "byzantium": true
  },
  "args": [
    259200,
    "0x65859533Cc2efa7d0F697A8dd8FAFe1a7f6FFE64"
  ],
  "numDeployments": 1,
  "solcInputHash": "4138c0c854528929e18f6ccc34d600b0",
  "metadata": "{\"compiler\":{\"version\":\"0.8.6+commit.11564f7e\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_duration\",\"type\":\"uint256\"},{\"internalType\":\"contract IJBFundingCycleStore\",\"name\":\"_fundingCycleStore\",\"type\":\"address\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"projectId\",\"type\":\"uint256\"},{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"configuration\",\"type\":\"uint256\"},{\"indexed\":true,\"internalType\":\"enum JBBallotState\",\"name\":\"ballotState\",\"type\":\"uint8\"},{\"indexed\":false,\"internalType\":\"address\",\"name\":\"caller\",\"type\":\"address\"}],\"name\":\"Finalize\",\"type\":\"event\"},{\"inputs\":[],\"name\":\"duration\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"finalState\",\"outputs\":[{\"internalType\":\"enum JBBallotState\",\"name\":\"\",\"type\":\"uint8\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_projectId\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"_configured\",\"type\":\"uint256\"}],\"name\":\"finalize\",\"outputs\":[{\"internalType\":\"enum JBBallotState\",\"name\":\"ballotState\",\"type\":\"uint8\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"fundingCycleStore\",\"outputs\":[{\"internalType\":\"contract IJBFundingCycleStore\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_projectId\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"_configured\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"_start\",\"type\":\"uint256\"}],\"name\":\"stateOf\",\"outputs\":[{\"internalType\":\"enum JBBallotState\",\"name\":\"\",\"type\":\"uint8\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes4\",\"name\":\"_interfaceId\",\"type\":\"bytes4\"}],\"name\":\"supportsInterface\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"}],\"devdoc\":{\"details\":\"Adheres to - IJBReconfigurationBufferBallot: General interface for the methods in this contract that interact with the blockchain's state according to the protocol's rules.Inherits from - ERC165: Introspection on interface adherance. \",\"kind\":\"dev\",\"methods\":{\"constructor\":{\"params\":{\"_duration\":\"The number of seconds to wait until a reconfiguration can be either `Approved` or `Failed`.\",\"_fundingCycleStore\":\"A contract storing all funding cycle configurations.\"}},\"finalize(uint256,uint256)\":{\"params\":{\"_configured\":\"The configuration of the funding cycle to check the state of.\",\"_projectId\":\"The ID of the project to which the funding cycle being checked belongs.\"},\"returns\":{\"ballotState\":\"The state of the finalized ballot. If `Active`, the ballot can still later be finalized when it's state resolves.\"}},\"stateOf(uint256,uint256,uint256)\":{\"params\":{\"_configured\":\"The configuration of the funding cycle to check the state of.\",\"_projectId\":\"The ID of the project to which the funding cycle being checked belongs.\",\"_start\":\"The start timestamp of the funding cycle to check the state of.\"},\"returns\":{\"_0\":\"The state of the provided ballot.\"}},\"supportsInterface(bytes4)\":{\"details\":\" See {IERC165-supportsInterface}.\",\"params\":{\"_interfaceId\":\"The ID of the interface to check for adherance to.\"},\"returns\":{\"_0\":\"A flag indicating if this contract adheres to the specified interface.\"}}},\"stateVariables\":{\"finalState\":{\"details\":\"If `Active`, the ballot for the provided configuration can still be finalized whenever its state settles. _projectId The ID of the project to check the final ballot state of. _configuration The configuration of the funding cycle to check the final ballot state of.\"}},\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{\"duration()\":{\"notice\":\" The number of seconds that must pass for a funding cycle reconfiguration to become either `Approved` or `Failed`.\"},\"finalState(uint256,uint256)\":{\"notice\":\" The finalized state.\"},\"finalize(uint256,uint256)\":{\"notice\":\" Finalizes a configuration state if the current state has settled.\"},\"fundingCycleStore()\":{\"notice\":\"The contract storing all funding cycle configurations.\"},\"stateOf(uint256,uint256,uint256)\":{\"notice\":\" The approval state of a particular funding cycle.\"},\"supportsInterface(bytes4)\":{\"notice\":\"Indicates if this contract adheres to the specified interface.\"}},\"notice\":\" Manages approving funding cycle reconfigurations automatically after a buffer period.\",\"version\":1}},\"settings\":{\"compilationTarget\":{\"contracts/JBReconfigurationBufferBallot.sol\":\"JBReconfigurationBufferBallot\"},\"evmVersion\":\"berlin\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\",\"useLiteralContent\":true},\"optimizer\":{\"enabled\":true,\"runs\":10000},\"remappings\":[]},\"sources\":{\"@openzeppelin/contracts/utils/introspection/ERC165.sol\":{\"content\":\"// SPDX-License-Identifier: MIT\\n// OpenZeppelin Contracts v4.4.1 (utils/introspection/ERC165.sol)\\n\\npragma solidity ^0.8.0;\\n\\nimport \\\"./IERC165.sol\\\";\\n\\n/**\\n * @dev Implementation of the {IERC165} interface.\\n *\\n * Contracts that want to implement ERC165 should inherit from this contract and override {supportsInterface} to check\\n * for the additional interface id that will be supported. For example:\\n *\\n * ```solidity\\n * function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {\\n *     return interfaceId == type(MyInterface).interfaceId || super.supportsInterface(interfaceId);\\n * }\\n * ```\\n *\\n * Alternatively, {ERC165Storage} provides an easier to use but more expensive implementation.\\n */\\nabstract contract ERC165 is IERC165 {\\n    /**\\n     * @dev See {IERC165-supportsInterface}.\\n     */\\n    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {\\n        return interfaceId == type(IERC165).interfaceId;\\n    }\\n}\\n\",\"keccak256\":\"0xd10975de010d89fd1c78dc5e8a9a7e7f496198085c151648f20cba166b32582b\",\"license\":\"MIT\"},\"@openzeppelin/contracts/utils/introspection/IERC165.sol\":{\"content\":\"// SPDX-License-Identifier: MIT\\n// OpenZeppelin Contracts v4.4.1 (utils/introspection/IERC165.sol)\\n\\npragma solidity ^0.8.0;\\n\\n/**\\n * @dev Interface of the ERC165 standard, as defined in the\\n * https://eips.ethereum.org/EIPS/eip-165[EIP].\\n *\\n * Implementers can declare support of contract interfaces, which can then be\\n * queried by others ({ERC165Checker}).\\n *\\n * For an implementation, see {ERC165}.\\n */\\ninterface IERC165 {\\n    /**\\n     * @dev Returns true if this contract implements the interface defined by\\n     * `interfaceId`. See the corresponding\\n     * https://eips.ethereum.org/EIPS/eip-165#how-interfaces-are-identified[EIP section]\\n     * to learn more about how these ids are created.\\n     *\\n     * This function call must use less than 30 000 gas.\\n     */\\n    function supportsInterface(bytes4 interfaceId) external view returns (bool);\\n}\\n\",\"keccak256\":\"0x447a5f3ddc18419d41ff92b3773fb86471b1db25773e07f877f548918a185bf1\",\"license\":\"MIT\"},\"contracts/JBReconfigurationBufferBallot.sol\":{\"content\":\"// SPDX-License-Identifier: MIT\\npragma solidity 0.8.6;\\n\\nimport '@openzeppelin/contracts/utils/introspection/ERC165.sol';\\nimport './interfaces/IJBReconfigurationBufferBallot.sol';\\nimport './structs/JBFundingCycle.sol';\\n\\n/** \\n  @notice \\n  Manages approving funding cycle reconfigurations automatically after a buffer period.\\n\\n  @dev\\n  Adheres to -\\n  IJBReconfigurationBufferBallot: General interface for the methods in this contract that interact with the blockchain's state according to the protocol's rules.\\n\\n  @dev\\n  Inherits from -\\n  ERC165: Introspection on interface adherance. \\n*/\\ncontract JBReconfigurationBufferBallot is IJBReconfigurationBufferBallot, ERC165 {\\n  //*********************************************************************//\\n  // ---------------- public immutable stored properties --------------- //\\n  //*********************************************************************//\\n\\n  /**\\n    @notice \\n    The number of seconds that must pass for a funding cycle reconfiguration to become either `Approved` or `Failed`.\\n  */\\n  uint256 public immutable override duration;\\n\\n  /**\\n    @notice\\n    The contract storing all funding cycle configurations.\\n  */\\n  IJBFundingCycleStore public immutable override fundingCycleStore;\\n\\n  //*********************************************************************//\\n  // --------------------- public stored properties -------------------- //\\n  //*********************************************************************//\\n\\n  /**\\n    @notice \\n    The finalized state.\\n\\n    @dev\\n    If `Active`, the ballot for the provided configuration can still be finalized whenever its state settles.\\n\\n    _projectId The ID of the project to check the final ballot state of.\\n    _configuration The configuration of the funding cycle to check the final ballot state of.\\n  */\\n  mapping(uint256 => mapping(uint256 => JBBallotState)) public override finalState;\\n\\n  //*********************************************************************//\\n  // -------------------------- public views --------------------------- //\\n  //*********************************************************************//\\n\\n  /**\\n    @notice \\n    The approval state of a particular funding cycle.\\n\\n    @param _projectId The ID of the project to which the funding cycle being checked belongs.\\n    @param _configured The configuration of the funding cycle to check the state of.\\n    @param _start The start timestamp of the funding cycle to check the state of.\\n\\n    @return The state of the provided ballot.\\n  */\\n  function stateOf(\\n    uint256 _projectId,\\n    uint256 _configured,\\n    uint256 _start\\n  ) public view override returns (JBBallotState) {\\n    // If there is a finalized state, return it.\\n    if (finalState[_projectId][_configured] != JBBallotState.Active)\\n      return finalState[_projectId][_configured];\\n\\n    // If the delay hasn't yet passed, the ballot is either failed or active.\\n    if (block.timestamp < _configured + duration)\\n      // If the current timestamp is past the start, the ballot is failed.\\n      return (block.timestamp >= _start) ? JBBallotState.Failed : JBBallotState.Active;\\n\\n    // The ballot is otherwise approved.\\n    return JBBallotState.Approved;\\n  }\\n\\n  /**\\n    @notice\\n    Indicates if this contract adheres to the specified interface.\\n\\n    @dev \\n    See {IERC165-supportsInterface}.\\n\\n    @param _interfaceId The ID of the interface to check for adherance to.\\n\\n    @return A flag indicating if this contract adheres to the specified interface.\\n  */\\n  function supportsInterface(bytes4 _interfaceId)\\n    public\\n    view\\n    virtual\\n    override(ERC165, IERC165)\\n    returns (bool)\\n  {\\n    return\\n      _interfaceId == type(IJBReconfigurationBufferBallot).interfaceId ||\\n      _interfaceId == type(IJBFundingCycleBallot).interfaceId ||\\n      super.supportsInterface(_interfaceId);\\n  }\\n\\n  //*********************************************************************//\\n  // -------------------------- constructor ---------------------------- //\\n  //*********************************************************************//\\n\\n  /**\\n    @param _duration The number of seconds to wait until a reconfiguration can be either `Approved` or `Failed`.\\n    @param _fundingCycleStore A contract storing all funding cycle configurations.\\n  */\\n  constructor(uint256 _duration, IJBFundingCycleStore _fundingCycleStore) {\\n    duration = _duration;\\n    fundingCycleStore = _fundingCycleStore;\\n  }\\n\\n  //*********************************************************************//\\n  // ---------------------- external transactions ---------------------- //\\n  //*********************************************************************//\\n\\n  /**\\n    @notice \\n    Finalizes a configuration state if the current state has settled.\\n\\n    @param _projectId The ID of the project to which the funding cycle being checked belongs.\\n    @param _configured The configuration of the funding cycle to check the state of.\\n\\n    @return ballotState The state of the finalized ballot. If `Active`, the ballot can still later be finalized when it's state resolves.\\n  */\\n  function finalize(uint256 _projectId, uint256 _configured)\\n    external\\n    override\\n    returns (JBBallotState ballotState)\\n  {\\n    // Get the funding cycle for the configuration in question.\\n    JBFundingCycle memory _fundingCycle = fundingCycleStore.get(_projectId, _configured);\\n\\n    // Get the current ballot state.\\n    ballotState = finalState[_projectId][_configured];\\n\\n    // If the final ballot state is still `Active`.\\n    if (ballotState == JBBallotState.Active) {\\n      ballotState = stateOf(_projectId, _configured, _fundingCycle.start);\\n      // If the ballot is active after the cycle has started, it should be finalized as failed.\\n      if (ballotState != JBBallotState.Active) {\\n        // Store the updated value.\\n        finalState[_projectId][_configured] = ballotState;\\n\\n        emit Finalize(_projectId, _configured, ballotState, msg.sender);\\n      }\\n    }\\n  }\\n}\\n\",\"keccak256\":\"0x9a689782db3bd098c7e0daba30b39ad8647d4a2289cdf9dde877191e9ca321eb\",\"license\":\"MIT\"},\"contracts/enums/JBBallotState.sol\":{\"content\":\"// SPDX-License-Identifier: MIT\\npragma solidity 0.8.6;\\n\\nenum JBBallotState {\\n  Active,\\n  Approved,\\n  Failed\\n}\\n\",\"keccak256\":\"0xadf07fd49f7e0947006fa1921bc7fd8fb532e8fecf3b9266721a8b7e43907461\",\"license\":\"MIT\"},\"contracts/interfaces/IJBFundingCycleBallot.sol\":{\"content\":\"// SPDX-License-Identifier: MIT\\npragma solidity 0.8.6;\\n\\nimport '@openzeppelin/contracts/utils/introspection/IERC165.sol';\\nimport './../enums/JBBallotState.sol';\\nimport './IJBFundingCycleStore.sol';\\n\\ninterface IJBFundingCycleBallot is IERC165 {\\n  function duration() external view returns (uint256);\\n\\n  function stateOf(\\n    uint256 _projectId,\\n    uint256 _configuration,\\n    uint256 _start\\n  ) external view returns (JBBallotState);\\n}\\n\",\"keccak256\":\"0xdc8c8bed613f5759c958b7b0d646032b4337a349a8ecea5ffeb167623f2f29f5\",\"license\":\"MIT\"},\"contracts/interfaces/IJBFundingCycleStore.sol\":{\"content\":\"// SPDX-License-Identifier: MIT\\npragma solidity 0.8.6;\\n\\nimport './../enums/JBBallotState.sol';\\nimport './../structs/JBFundingCycle.sol';\\nimport './../structs/JBFundingCycleData.sol';\\n\\ninterface IJBFundingCycleStore {\\n  event Configure(\\n    uint256 indexed configuration,\\n    uint256 indexed projectId,\\n    JBFundingCycleData data,\\n    uint256 metadata,\\n    uint256 mustStartAtOrAfter,\\n    address caller\\n  );\\n\\n  event Init(uint256 indexed configuration, uint256 indexed projectId, uint256 indexed basedOn);\\n\\n  function latestConfigurationOf(uint256 _projectId) external view returns (uint256);\\n\\n  function get(uint256 _projectId, uint256 _configuration)\\n    external\\n    view\\n    returns (JBFundingCycle memory);\\n\\n  function latestConfiguredOf(uint256 _projectId)\\n    external\\n    view\\n    returns (JBFundingCycle memory fundingCycle, JBBallotState ballotState);\\n\\n  function queuedOf(uint256 _projectId) external view returns (JBFundingCycle memory fundingCycle);\\n\\n  function currentOf(uint256 _projectId) external view returns (JBFundingCycle memory fundingCycle);\\n\\n  function currentBallotStateOf(uint256 _projectId) external view returns (JBBallotState);\\n\\n  function configureFor(\\n    uint256 _projectId,\\n    JBFundingCycleData calldata _data,\\n    uint256 _metadata,\\n    uint256 _mustStartAtOrAfter\\n  ) external returns (JBFundingCycle memory fundingCycle);\\n}\\n\",\"keccak256\":\"0xf75791cd5b71bc6773cf56c92501e3f255a406eaedea781cb57cea2fa1e4ef20\",\"license\":\"MIT\"},\"contracts/interfaces/IJBReconfigurationBufferBallot.sol\":{\"content\":\"// SPDX-License-Identifier: MIT\\npragma solidity 0.8.6;\\n\\nimport './IJBFundingCycleBallot.sol';\\n\\ninterface IJBReconfigurationBufferBallot is IJBFundingCycleBallot {\\n  event Finalize(\\n    uint256 indexed projectId,\\n    uint256 indexed configuration,\\n    JBBallotState indexed ballotState,\\n    address caller\\n  );\\n\\n  function finalState(uint256 _projectId, uint256 _configuration)\\n    external\\n    view\\n    returns (JBBallotState);\\n\\n  function fundingCycleStore() external view returns (IJBFundingCycleStore);\\n\\n  function finalize(uint256 _projectId, uint256 _configured) external returns (JBBallotState);\\n}\\n\",\"keccak256\":\"0x9bbab8d17cee1a05fad87770796d74a97aed12422b1d344d84d6dd153306c34d\",\"license\":\"MIT\"},\"contracts/structs/JBFundingCycle.sol\":{\"content\":\"// SPDX-License-Identifier: MIT\\npragma solidity 0.8.6;\\n\\nimport './../interfaces/IJBFundingCycleBallot.sol';\\n\\n/** \\n  @member number The funding cycle number for the cycle's project. Each funding cycle has a number that is an increment of the cycle that directly preceded it. Each project's first funding cycle has a number of 1.\\n  @member configuration The timestamp when the parameters for this funding cycle were configured. This value will stay the same for subsequent funding cycles that roll over from an originally configured cycle.\\n  @member basedOn The `configuration` of the funding cycle that was active when this cycle was created.\\n  @member start The timestamp marking the moment from which the funding cycle is considered active. It is a unix timestamp measured in seconds.\\n  @member duration The number of seconds the funding cycle lasts for, after which a new funding cycle will start. A duration of 0 means that the funding cycle will stay active until the project owner explicitly issues a reconfiguration, at which point a new funding cycle will immediately start with the updated properties. If the duration is greater than 0, a project owner cannot make changes to a funding cycle's parameters while it is active \\u2013 any proposed changes will apply to the subsequent cycle. If no changes are proposed, a funding cycle rolls over to another one with the same properties but new `start` timestamp and a discounted `weight`.\\n  @member weight A fixed point number with 18 decimals that contracts can use to base arbitrary calculations on. For example, payment terminals can use this to determine how many tokens should be minted when a payment is received.\\n  @member discountRate A percent by how much the `weight` of the subsequent funding cycle should be reduced, if the project owner hasn't configured the subsequent funding cycle with an explicit `weight`. If it's 0, each funding cycle will have equal weight. If the number is 90%, the next funding cycle will have a 10% smaller weight. This weight is out of `JBConstants.MAX_DISCOUNT_RATE`.\\n  @member ballot An address of a contract that says whether a proposed reconfiguration should be accepted or rejected. It can be used to create rules around how a project owner can change funding cycle parameters over time.\\n  @member metadata Extra data that can be associated with a funding cycle.\\n*/\\nstruct JBFundingCycle {\\n  uint256 number;\\n  uint256 configuration;\\n  uint256 basedOn;\\n  uint256 start;\\n  uint256 duration;\\n  uint256 weight;\\n  uint256 discountRate;\\n  IJBFundingCycleBallot ballot;\\n  uint256 metadata;\\n}\\n\",\"keccak256\":\"0x7e1ee378705e677298b955bd82b7c79b962e1c2e20f840eb8c491aba595e4905\",\"license\":\"MIT\"},\"contracts/structs/JBFundingCycleData.sol\":{\"content\":\"// SPDX-License-Identifier: MIT\\npragma solidity 0.8.6;\\n\\nimport './../interfaces/IJBFundingCycleBallot.sol';\\n\\n/** \\n  @member duration The number of seconds the funding cycle lasts for, after which a new funding cycle will start. A duration of 0 means that the funding cycle will stay active until the project owner explicitly issues a reconfiguration, at which point a new funding cycle will immediately start with the updated properties. If the duration is greater than 0, a project owner cannot make changes to a funding cycle's parameters while it is active \\u2013 any proposed changes will apply to the subsequent cycle. If no changes are proposed, a funding cycle rolls over to another one with the same properties but new `start` timestamp and a discounted `weight`.\\n  @member weight A fixed point number with 18 decimals that contracts can use to base arbitrary calculations on. For example, payment terminals can use this to determine how many tokens should be minted when a payment is received.\\n  @member discountRate A percent by how much the `weight` of the subsequent funding cycle should be reduced, if the project owner hasn't configured the subsequent funding cycle with an explicit `weight`. If it's 0, each funding cycle will have equal weight. If the number is 90%, the next funding cycle will have a 10% smaller weight. This weight is out of `JBConstants.MAX_DISCOUNT_RATE`.\\n  @member ballot An address of a contract that says whether a proposed reconfiguration should be accepted or rejected. It can be used to create rules around how a project owner can change funding cycle parameters over time.\\n*/\\nstruct JBFundingCycleData {\\n  uint256 duration;\\n  uint256 weight;\\n  uint256 discountRate;\\n  IJBFundingCycleBallot ballot;\\n}\\n\",\"keccak256\":\"0xfc1c73d1b01782bbdfdd73d5d25f075e6c33dd37414638b63664063a0d1692cc\",\"license\":\"MIT\"}},\"version\":1}",
  "bytecode": "0x60c060405234801561001057600080fd5b5060405161080c38038061080c83398101604081905261002f9161004a565b60809190915260601b6001600160601b03191660a052610087565b6000806040838503121561005d57600080fd5b825160208401519092506001600160a01b038116811461007c57600080fd5b809150509250929050565b60805160a05160601c6107516100bb6000396000818160d9015261035d01526000818160a401526102bd01526107516000f3fe608060405234801561001057600080fd5b50600436106100725760003560e01c806374167907116100505780637416790714610120578063a994c09f14610140578063b6013cef1461016b57600080fd5b806301ffc9a7146100775780630fb5a6b41461009f578063557e7155146100d4575b600080fd5b61008a61008536600461050b565b61017e565b60405190151581526020015b60405180910390f35b6100c67f000000000000000000000000000000000000000000000000000000000000000081565b604051908152602001610096565b6100fb7f000000000000000000000000000000000000000000000000000000000000000081565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610096565b61013361012e3660046105ef565b610263565b604051610096919061061b565b61013361014e3660046105cd565b600060208181529281526040808220909352908152205460ff1681565b6101336101793660046105cd565b61030d565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f4aeb8d2500000000000000000000000000000000000000000000000000000000148061021157507fffffffff0000000000000000000000000000000000000000000000000000000082167f7ba3dfb300000000000000000000000000000000000000000000000000000000145b8061025d57507f01ffc9a7000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316145b92915050565b60008060008581526020818152604080832087845290915290205460ff166002811115610292576102926106ec565b146102b8575060008381526020818152604080832085845290915290205460ff16610306565b6102e27f0000000000000000000000000000000000000000000000000000000000000000846106ad565b42101561030257814210156102f85760006102fb565b60025b9050610306565b5060015b9392505050565b6040517f669e48aa0000000000000000000000000000000000000000000000000000000081526004810183905260248101829052600090819073ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000169063669e48aa906044016101206040518083038186803b1580156103a057600080fd5b505afa1580156103b4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103d8919061054d565b60008581526020818152604080832087845290915281205460ff16935090915082600281111561040a5761040a6106ec565b14156104db5761041f84848360600151610263565b91506000826002811115610435576104356106ec565b146104db57600084815260208181526040808320868452909152902080548391907fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016600183600281111561048c5761048c6106ec565b02179055508160028111156104a3576104a36106ec565b604051338152849086907f7e3b0e79d754a8d4c902d51b0deb131c43d7a702f465413e38db25cf786b0b349060200160405180910390a45b5092915050565b805173ffffffffffffffffffffffffffffffffffffffff8116811461050657600080fd5b919050565b60006020828403121561051d57600080fd5b81357fffffffff000000000000000000000000000000000000000000000000000000008116811461030657600080fd5b6000610120828403121561056057600080fd5b61056861065c565b825181526020830151602082015260408301516040820152606083015160608201526080830151608082015260a083015160a082015260c083015160c08201526105b460e084016104e2565b60e0820152610100928301519281019290925250919050565b600080604083850312156105e057600080fd5b50508035926020909101359150565b60008060006060848603121561060457600080fd5b505081359360208301359350604090920135919050565b6020810160038310610656577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b91905290565b604051610120810167ffffffffffffffff811182821017156106a7577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b60405290565b600082198211156106e7577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b500190565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fdfea2646970667358221220b4c451762a49327da15d0f73731945f302ac28b4c7176ec1fd7268bced594b7b64736f6c63430008060033",
  "deployedBytecode": "0x608060405234801561001057600080fd5b50600436106100725760003560e01c806374167907116100505780637416790714610120578063a994c09f14610140578063b6013cef1461016b57600080fd5b806301ffc9a7146100775780630fb5a6b41461009f578063557e7155146100d4575b600080fd5b61008a61008536600461050b565b61017e565b60405190151581526020015b60405180910390f35b6100c67f000000000000000000000000000000000000000000000000000000000000000081565b604051908152602001610096565b6100fb7f000000000000000000000000000000000000000000000000000000000000000081565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610096565b61013361012e3660046105ef565b610263565b604051610096919061061b565b61013361014e3660046105cd565b600060208181529281526040808220909352908152205460ff1681565b6101336101793660046105cd565b61030d565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f4aeb8d2500000000000000000000000000000000000000000000000000000000148061021157507fffffffff0000000000000000000000000000000000000000000000000000000082167f7ba3dfb300000000000000000000000000000000000000000000000000000000145b8061025d57507f01ffc9a7000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316145b92915050565b60008060008581526020818152604080832087845290915290205460ff166002811115610292576102926106ec565b146102b8575060008381526020818152604080832085845290915290205460ff16610306565b6102e27f0000000000000000000000000000000000000000000000000000000000000000846106ad565b42101561030257814210156102f85760006102fb565b60025b9050610306565b5060015b9392505050565b6040517f669e48aa0000000000000000000000000000000000000000000000000000000081526004810183905260248101829052600090819073ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000169063669e48aa906044016101206040518083038186803b1580156103a057600080fd5b505afa1580156103b4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103d8919061054d565b60008581526020818152604080832087845290915281205460ff16935090915082600281111561040a5761040a6106ec565b14156104db5761041f84848360600151610263565b91506000826002811115610435576104356106ec565b146104db57600084815260208181526040808320868452909152902080548391907fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016600183600281111561048c5761048c6106ec565b02179055508160028111156104a3576104a36106ec565b604051338152849086907f7e3b0e79d754a8d4c902d51b0deb131c43d7a702f465413e38db25cf786b0b349060200160405180910390a45b5092915050565b805173ffffffffffffffffffffffffffffffffffffffff8116811461050657600080fd5b919050565b60006020828403121561051d57600080fd5b81357fffffffff000000000000000000000000000000000000000000000000000000008116811461030657600080fd5b6000610120828403121561056057600080fd5b61056861065c565b825181526020830151602082015260408301516040820152606083015160608201526080830151608082015260a083015160a082015260c083015160c08201526105b460e084016104e2565b60e0820152610100928301519281019290925250919050565b600080604083850312156105e057600080fd5b50508035926020909101359150565b60008060006060848603121561060457600080fd5b505081359360208301359350604090920135919050565b6020810160038310610656577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b91905290565b604051610120810167ffffffffffffffff811182821017156106a7577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b60405290565b600082198211156106e7577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b500190565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fdfea2646970667358221220b4c451762a49327da15d0f73731945f302ac28b4c7176ec1fd7268bced594b7b64736f6c63430008060033",
  "devdoc": {
    "details": "Adheres to - IJBReconfigurationBufferBallot: General interface for the methods in this contract that interact with the blockchain's state according to the protocol's rules.Inherits from - ERC165: Introspection on interface adherance. ",
    "kind": "dev",
    "methods": {
      "constructor": {
        "params": {
          "_duration": "The number of seconds to wait until a reconfiguration can be either `Approved` or `Failed`.",
          "_fundingCycleStore": "A contract storing all funding cycle configurations."
        }
      },
      "finalize(uint256,uint256)": {
        "params": {
          "_configured": "The configuration of the funding cycle to check the state of.",
          "_projectId": "The ID of the project to which the funding cycle being checked belongs."
        },
        "returns": {
          "ballotState": "The state of the finalized ballot. If `Active`, the ballot can still later be finalized when it's state resolves."
        }
      },
      "stateOf(uint256,uint256,uint256)": {
        "params": {
          "_configured": "The configuration of the funding cycle to check the state of.",
          "_projectId": "The ID of the project to which the funding cycle being checked belongs.",
          "_start": "The start timestamp of the funding cycle to check the state of."
        },
        "returns": {
          "_0": "The state of the provided ballot."
        }
      },
      "supportsInterface(bytes4)": {
        "details": " See {IERC165-supportsInterface}.",
        "params": {
          "_interfaceId": "The ID of the interface to check for adherance to."
        },
        "returns": {
          "_0": "A flag indicating if this contract adheres to the specified interface."
        }
      }
    },
    "stateVariables": {
      "finalState": {
        "details": "If `Active`, the ballot for the provided configuration can still be finalized whenever its state settles. _projectId The ID of the project to check the final ballot state of. _configuration The configuration of the funding cycle to check the final ballot state of."
      }
    },
    "version": 1
  },
  "userdoc": {
    "kind": "user",
    "methods": {
      "duration()": {
        "notice": " The number of seconds that must pass for a funding cycle reconfiguration to become either `Approved` or `Failed`."
      },
      "finalState(uint256,uint256)": {
        "notice": " The finalized state."
      },
      "finalize(uint256,uint256)": {
        "notice": " Finalizes a configuration state if the current state has settled."
      },
      "fundingCycleStore()": {
        "notice": "The contract storing all funding cycle configurations."
      },
      "stateOf(uint256,uint256,uint256)": {
        "notice": " The approval state of a particular funding cycle."
      },
      "supportsInterface(bytes4)": {
        "notice": "Indicates if this contract adheres to the specified interface."
      }
    },
    "notice": " Manages approving funding cycle reconfigurations automatically after a buffer period.",
    "version": 1
  },
  "storageLayout": {
    "storage": [
      {
        "astId": 15095,
        "contract": "contracts/JBReconfigurationBufferBallot.sol:JBReconfigurationBufferBallot",
        "label": "finalState",
        "offset": 0,
        "slot": "0",
        "type": "t_mapping(t_uint256,t_mapping(t_uint256,t_enum(JBBallotState)25464))"
      }
    ],
    "types": {
      "t_enum(JBBallotState)25464": {
        "encoding": "inplace",
        "label": "enum JBBallotState",
        "numberOfBytes": "1"
      },
      "t_mapping(t_uint256,t_enum(JBBallotState)25464)": {
        "encoding": "mapping",
        "key": "t_uint256",
        "label": "mapping(uint256 => enum JBBallotState)",
        "numberOfBytes": "32",
        "value": "t_enum(JBBallotState)25464"
      },
      "t_mapping(t_uint256,t_mapping(t_uint256,t_enum(JBBallotState)25464))": {
        "encoding": "mapping",
        "key": "t_uint256",
        "label": "mapping(uint256 => mapping(uint256 => enum JBBallotState))",
        "numberOfBytes": "32",
        "value": "t_mapping(t_uint256,t_enum(JBBallotState)25464)"
      },
      "t_uint256": {
        "encoding": "inplace",
        "label": "uint256",
        "numberOfBytes": "32"
      }
    }
  }
}