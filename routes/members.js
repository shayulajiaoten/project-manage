const express = require('express');
const router = express.Router();
const {
  create_team,
  create_team_list,
  team_list,
  team_members_list,
  invite_member,
  delete_member,
  noteam_member
} = require('../controller/members')

const {
  SuccessModel,
  ErrorModel
} = require('../model/resModel')


// 创建团队接口
router.post('/createTeam', function (req, res, next) {
  const {
    teamName
  } = req.body
  const result = create_team(teamName)
  return result.then((data) => {
    if (data) {
      res.json(
        new SuccessModel('申请成功')
      )
    } else {
      res.json(
        new ErrorModel('队名已存在')
      )
    }
  })
});

// 查看团队申请列表
router.get('/createTeamList', function (req, res, next) {
  const result = create_team_list()
  return result.then((dataList => {
    res.json(
      new SuccessModel(dataList)
    )
  }))
})

// 查询已经存在团队列表
router.get('/teamList', (req, res, next) => {
  const result = team_list()
  return result.then(dataList => {
    res.json(
      new SuccessModel(dataList)
    )
  })
})

// 根据团队名字查询对应团队成员信息
router.get('/teamMembersList', (req, res, next) => {
  const result = team_members_list(req.query.teamName)
  return result.then(dataList => {
    res.json(
      new SuccessModel(dataList)
    )
  })
})

// 查询没有加入任何团队的成员
router.get('/noTeam', (req, res, next) => {
  const result = noteam_member()
  return result.then(dataList => {
    res.json(
      new SuccessModel(dataList)
    )
  })
})

// 邀请团队成员
// teanName:团队名;memberId:被邀请成员Id
router.post('/inviteMember', (req, res, next) => {
  const {
    teamName,
    memberId
  } = req.body
  const result = invite_member(teamName, memberId)

  return result.then((data) => {
    if (data) {
      res.json(
        new SuccessModel('邀请成功')
      )
    } else {
      res.json(
        new ErrorModel('你不是该团队成员，没有权限邀请')
      )
    }
  })
})

// 移除团队成员
// teanName:团队名;memberId:被移除成员Id
router.post('/deleteMember', (req, res, next) => {
  const {
    teamName,
    memberId
  } = req.body
  const result = delete_member(teamName, memberId)
  return result.then((data) => {
    if (data) {
      res.json(
        new SuccessModel('移除成功')
      )
    } else {
      res.json(
        new ErrorModel('你不是该团队队长，没有权限邀请')
      )
    }
  })
})

module.exports = router;