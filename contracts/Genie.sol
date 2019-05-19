pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

import "./Wishes.sol";

//The Genie that lives inside this contract simply wishes to fulfill the wishes of others
//To accomplish this the genie grants extra wishes to anyone who helps build the Genie platform
//The Genie platform lets Genies (Bounty Hunters) fulfill bounties set forth by Wishers (Users) in exchange for Wishes (An inbuilt ERC20 Token)
contract Genie is Wishes {

    //Only let the account owner
    modifier onlyOwner()
    {
        require(msg.sender == owner);
        _;
    }

    address public owner;

// The Bounty Pool of all wishes available to the Genie Contract
    uint256 PoolofWishes = 21*10**8;
    uint256 public numWishes = 0;
    struct Wish{
        address wisher;
        uint256 reward;
        string name;
        string description;
        bool active;
        //mapping(address => string) applicants;
        address[] claimants;
        mapping(address => string) claims;
    }

    struct Logo {
        string BrandName;
        string Industry;
        string Competitors;
        string Notes;
        string imageRef1;
        string imageRef2;
        string color1;
        string color2;
    }

    mapping(uint => Logo) LogoWishes;

    function getLogo(uint index) public view returns(Logo memory){
        return LogoWishes[index];
    }

    function wishForLogo (
        uint reward,
        string memory BrandName,
        string memory Industry,
        string memory Competitors,
        string memory Notes,
        string memory imageRef1,
        string memory imageRef2,
        string memory color1,
        string memory color2
        ) public{
        LogoWishes[numWishes] = Logo(BrandName,Industry,Competitors,Notes,imageRef1,imageRef2,color1,color2);
        MakeWish(reward,"Logo","create Logo");

    }

    struct Graphic{
        string Industry;
        string Usage;
        string Dimensions;
        string Notes;
        string imageRef1;
        string imageRef2;
    }

    mapping(uint => Graphic) GraphicWishes;

     function getGraphic(uint index) public view returns(Graphic memory){
        return GraphicWishes[index];
    }

    function wishForGraphic (
        uint reward,
        string memory Industry,
        string memory Usage,
        string memory Dimensions,
        string memory Notes,
        string memory imageRef1,
        string memory imageRef2
        ) public{
        GraphicWishes[numWishes] = Graphic(Industry,Usage,Dimensions,Notes,imageRef1,imageRef2);
        MakeWish(reward,"Graphic","create Graphic");

    }

    mapping (uint256 => Wish) public wishes;

    constructor() public {
        owner = msg.sender;
        //To claim this bounty, build a web application that lets people claim bounties from the official Genie contract
        Wish memory firstWish = Wish({
            wisher: msg.sender,
            reward: 21*10**7,
            name: "The Genie's First Wish",
            description: "To claim this bounty, build a web application that lets people claim bounties from the official Genie contract",
            active: true,
            claimants:new address[](0)
        });

        PoolofWishes -= firstWish.reward;

        wishes[numWishes++] = firstWish;

    }
//Owner Functions
    function GenieMakeWish(uint256 _wishReward,string memory _name, string memory _description)
        public
        onlyOwner
        returns (uint wishID)
        {
            require(PoolofWishes>=_wishReward);
            wishes[numWishes] = Wish({
                wisher: msg.sender,
                reward: _wishReward,
                name: _name,
                description:_description,
                active: true,
                claimants:new address[](0)
            });
            PoolofWishes -= _wishReward;
            return numWishes++;
    }

    function metaRubLamp(
        address wisher,
        uint256 nonce,
        bytes memory signature
  ) public returns (bool success) {
    require(nonce<1);

    // Verify and increment nonce.
    require(getNonce(wisher) == nonce);

    // Verify signature.
    bytes32 payload = payloadToSign(wisher, nonce);
    require(verifyApproval(wisher, payload, signature));

    // Standard approve.
    require(wisher != address(0));

    _balances[wisher]+=1;

    _nonces[wisher] = _nonces[wisher].add(1);

    emit Granted(wisher);
    return true;
  }

//   function metaMakeWish(uint _wishID) public pure {
//         require(wishers[wisher]==true);
//     require(nonce<1);

//     // Verify and increment nonce.
//     require(getNonce(wisher) == nonce);

//     // Verify signature.
//     bytes32 payload = payloadToSign(wisher, nonce);
//     require(verifyApproval(wisher, payload, signature));

//     // Standard approve.
//     require(wisher != address(0));

//     _balances[wisher]+=1;

//     _nonces[wisher] = _nonces[wisher].add(1);

//     emit Granted(wisher);
//     return true;
//      require(_balances[msg.sender]>=_wishReward);
//             wishes[numWishes] = Wish({
//                 wisher: msg.sender,
//                 reward: _wishReward,
//                 name: _name,
//                 description:_description,
//                 active: true,
//                 claimants:new address[](0)
//             });
//             _balances[msg.sender] -= _wishReward;
//             emit Transfer(msg.sender,address(this),_wishReward);
//             return numWishes++;
//   }




    function ApproveWisher(address _wisher)
        public
        onlyOwner()
        {
            wishers[_wisher] = true;
        }

    function ApproveGenie(address _genie)
        public
        onlyOwner()
        {
            genies[_genie] = true;
        }
    function DisapproveGenie(address _genie)
       public
        onlyOwner()
        {
            genies[_genie] = false;
        }

        //wisher Functions

    function MakeWish(uint256 _wishReward,string memory _name, string memory _description)
        public
        returns (uint wishID)
        {
            require(_balances[msg.sender]>=_wishReward);
            wishes[numWishes] = Wish({
                wisher: msg.sender,
                reward: _wishReward,
                name: _name,
                description:_description,
                active: true,
                claimants:new address[](0)
            });
            _balances[msg.sender] -= _wishReward;
            emit Transfer(msg.sender,address(this),_wishReward);
            return numWishes++;
    }

    function rubLamp() public{
        require(_nonces[msg.sender]++<1);
        _balances[msg.sender] += 1;
        emit Transfer(address(0),msg.sender,1);
    }

    function ApproveWishFulfillment(uint _wishID,uint _claimID) public{
        require(wishes[_wishID].wisher == msg.sender);
        require(wishes[_wishID].active == true);
        uint reward = wishes[_wishID].reward;
        address claimant = wishes[_wishID].claimants[_claimID];
        _balances[claimant] += reward;
        emit Transfer(address(this),claimant,reward);
        wishes[_wishID].active = false;

    }



        //genie Functions

    /*function ApplyForBounty() public{

    }*/

    function fulfillWish(uint _wishID,string memory _submission) public{
        require(genies[msg.sender]==true);
        require(wishes[_wishID].active == true);
        wishes[_wishID].claims[msg.sender] = _submission;
        wishes[_wishID].claimants.push(msg.sender);
    }


}
