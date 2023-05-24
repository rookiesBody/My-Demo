var assert = require("assert")
var sum = require("../sum")

// // 断言函数执行的结果为某个值
// assert.strictEqual(sum(1), 1)

/**
 * describe 一组测试
 * it 一个测试
 */
describe("大组测试1", () => {
  describe('小组测试1', () => {
    it("sum() 结果应返回0", () => {
      assert.strictEqual(sum(), 0)
    })
    it("sum(1) 结果应返回1", () => {
      assert.strictEqual(sum(1), 1)
    })
  })

  describe('小组测试1', () => {
    it("sum(1, 2) 结果应返回3", () => {
      // assert.strictEqual(sum(1, 2), 10) //3 !== 10
      assert.strictEqual(sum(1, 2), 3)
    })
    it("sum(1, 2, 3) 结果应返回6", () => {
      assert.strictEqual(sum(1, 2, 3), 6)

    })
  })
})