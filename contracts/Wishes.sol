pragma solidity ^0.5.0;

//import "./GenieInterface.sol";
import "./IERC20.sol";
import "./SafeMath.sol";
import "./ECDSA.sol";


contract Wishes is IERC20 {
    string public _name;
    string public _symbol;
    uint8 public _decimals;

    event Granted(address wisher);

    mapping (address => uint256) public _nonces;
    mapping (address => bool) public genies;
    mapping (address => bool) public wishers;


    constructor () public {
        _name = "Wishes";
        _symbol = "WISH";
        _decimals = 0;
    }

    function name() public view returns (string memory) {
        return _name;
    }

    function symbol() public view returns (string memory) {
        return _symbol;
    }

    function decimals() public view returns (uint8) {
        return _decimals;
    }

    using SafeMath for uint256;

    mapping (address => uint256) public _balances;

    mapping (address => mapping (address => uint256)) private _allowances;

    uint256 private _totalSupply;

    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address owner) public view returns (uint256) {
        return _balances[owner];
    }

    function allowance(address owner, address spender) public view returns (uint256) {
        return _allowances[owner][spender];
    }

    function transfer(address to, uint256 value) public returns (bool) {
        _transfer(msg.sender, to, value);
        return true;
    }

    function approve(address spender, uint256 value) public returns (bool) {
        _approve(msg.sender, spender, value);
        return true;
    }

    function transferFrom(address from, address to, uint256 value) public returns (bool) {
        _transfer(from, to, value);
        _approve(from, msg.sender, _allowances[from][msg.sender].sub(value));
        return true;
    }


    function increaseAllowance(address spender, uint256 addedValue) public returns (bool) {
        _approve(msg.sender, spender, _allowances[msg.sender][spender].add(addedValue));
        return true;
    }

    function decreaseAllowance(address spender, uint256 subtractedValue) public returns (bool) {
        _approve(msg.sender, spender, _allowances[msg.sender][spender].sub(subtractedValue));
        return true;
    }

    function _transfer(address from, address to, uint256 value) internal {
        require(to != address(0), "ERC20: transfer to the zero address");

        _balances[from] = _balances[from].sub(value);
        _balances[to] = _balances[to].add(value);
        emit Transfer(from, to, value);
    }

    function _mint(address account, uint256 value) internal {
        require(account != address(0), "ERC20: mint to the zero address");

        _totalSupply = _totalSupply.add(value);
        _balances[account] = _balances[account].add(value);
        emit Transfer(address(0), account, value);
    }

    function _burn(address account, uint256 value) internal {
        require(account != address(0), "ERC20: burn from the zero address");

        _totalSupply = _totalSupply.sub(value);
        _balances[account] = _balances[account].sub(value);
        emit Transfer(account, address(0), value);
    }

    function _approve(address owner, address spender, uint256 value) internal {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = value;
        emit Approval(owner, spender, value);
    }

    function _burnFrom(address account, uint256 value) internal {
        _burn(account, value);
        _approve(account, msg.sender, _allowances[account][msg.sender].sub(value));
    }


  function payloadToSign(
    address wisher,
    uint256 nonce
  ) public
    view
    returns (bytes32 payload)
  {
    return ECDSA.toEthSignedMessageHash(
      keccak256(abi.encodePacked(
        wisher,         // Token Owner.
        address(this),  // Token address (replay protection).
        nonce           // Local sender specific nonce (replay protection).
      ))
    );
  }

  function getNonce(address sender) public view returns (uint256) {
    return _nonces[sender];
  }

  function verifyApproval (
    address wisher,
    bytes32 payload,
    bytes memory signature
  ) public
    pure
    returns (bool)
  {
    address recoveredAddress = ECDSA.recover(
      ECDSA.toEthSignedMessageHash(payload),
      signature
    );

    return recoveredAddress == wisher;
  }


}
