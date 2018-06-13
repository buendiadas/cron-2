var advanceToBlock = require('./helpers/advanceToBlock')
var stagesFromBounds = require('./helpers/stages')
const { assertRevert } = require('./helpers/assertRevert')

const StackContract = artifacts.require('Stack')
const PeriodContract = artifacts.require('Period')
const PeriodicStageContract = artifacts.require('PeriodicStages')
let Period
let Stack
let PeriodicStage
const T = 10
let initialOffset
let Registry

contract('PeriodicStages', function (accounts) {
  beforeEach(async () => {
    PeriodicStage = await PeriodicStageContract.new(T)
    let periodAddress = await PeriodicStage.period.call()
    Period = await PeriodContract.at(periodAddress)
    let stackAddress = await PeriodicStage.stageStack.call()
    Stack = StackContract.at(stackAddress)
  })
  describe('Calculating stages', async () => {
    it('Should start at stage 0', async () => {
      const currentStage = await PeriodicStage.currentStage.call()
      assert.strictEqual(0, currentStage.toNumber())
    })
    it('Should create a new Stage', async () => {
      const bounds = [T / 5]
      const totalCapacity = Stack.totalCapacity.call()
      stagesFromBounds.stagesFromBounds(Stack, bounds)
      assert.strictEqual(0, 0)
    })
    it('Should return 0 if the current block is inside of the first pushed stage', async () => {
      const bounds = [T / 5]
      const totalCapacity = await Stack.totalCapacity.call()
      await stagesFromBounds.stagesFromBounds(Stack, bounds)
      const indexInsideStage = await Period.getRelativeIndex()
      const neededIndexInStage = 1
      const blocksToAdvance = T - indexInsideStage + neededIndexInStage
      await advanceToBlock.advanceToBlock(web3.eth.blockNumber + blocksToAdvance)
      const newIndexInsideStage = await Period.getRelativeIndex()
      const currentStage = await PeriodicStage.currentStage.call()
      assert.strictEqual(0, currentStage.toNumber())
    })
    it('Should return 1 if the current block is inside of the second pushed stage', async () => {
      const bounds = [T / 5, 2 * T / 5]
      await stagesFromBounds.stagesFromBounds(Stack, bounds)
      const indexInsideStage = await Period.getRelativeIndex()
      const neededIndexInStage = T / 5 + 1
      const blocksToAdvance = T - indexInsideStage + neededIndexInStage
      await advanceToBlock.advanceToBlock(web3.eth.blockNumber + blocksToAdvance)
      const newIndexInsideStage = await Period.getRelativeIndex()
      const currentStage = await PeriodicStage.currentStage.call()
      assert.strictEqual(1, currentStage.toNumber())
    })
  })
})
