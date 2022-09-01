const { assert, expect } = require("chai")
const { network, deployments } = require("hardhat")
const { developmentChains, networkConfig } = require("../../helper-hardhat-config")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Basic NFT Unit Test", function () {
          let deployer, basicNft
          const TOKEN_URI =
              "ipfs://bafybeig37ioir76s7mg5oobetncojcm3c3hxasyd4rvid4jqhy4gkaheg4/?filename=0-PUG.json"
          beforeEach(async () => {
              accounts = await ethers.getSigners()
              await deployments.fixture(["basicnft"])
              basicNft = await ethers.getContract("BasicNFT")
          })

          describe("Constructor", function () {
              it("should initialize BasicNFT correctly", async () => {
                  const name = "Dogie"
                  const symbol = "DOG"
                  const Counter = 0

                  const tokenName = await basicNft.name()
                  const tokenSymbol = await basicNft.symbol()
                  const tokenCounter = await basicNft.getTokenCounter()

                  assert(tokenName, name)
                  assert(tokenSymbol, symbol)
                  assert(tokenCounter, Counter)
              })
          })
          describe("Mint()", function () {
              it("should mint the nft to an address", async () => {
                  await basicNft.mintNFT()
                  const counter = await basicNft.getTokenCounter()
                  expect(counter).to.equal(1)
              })
          })
          describe("TokenUri", function () {
              it("should return the token URI", async () => {
                  expect(await basicNft.tokenURI(0)).to.equal(TOKEN_URI)
              })
          })
      })
