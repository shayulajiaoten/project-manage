const express = require('express');
const router = express.Router();
const {
  create_team,
  create_team_list,
  team_list,
  team_members_list,
  invite_member,
  delete_member,
  noteam_member,
  get_currentteam,
  edit_team,
  delete_team,
} = require('../controller/members')
const loginCheck = require('../middleware/loginCheck')
const {
  SuccessModel,
  ErrorModel
} = require('../model/resModel')


// 创建团队接口
router.post('/createTeam', loginCheck, function (req, res, next) {
  const {
    teamName
  } = req.body
  const {
    member_name,
    member_id
  } = req.session

  const result = create_team(teamName, member_name, member_id)
  return result.then((data) => {
    switch (data) {
      case -1:
        return res.json(
          new ErrorModel('当前用户已归属团队')
        )
      case -2:
        return res.json(
          new ErrorModel('该队名已存在或正在申请中')
        )
      case 1:
        return res.json(
          new SuccessModel('申请成功')
        )
    }

  })
})

// 查看团队申请列表
router.get('/createTeamList', loginCheck, function (req, res, next) {
  const result = create_team_list()
  return result.then((dataList => {
    res.json(
      new SuccessModel(dataList)
    )
  }))
})

// 查询已经存在团队列表
router.get('/teamList', loginCheck, (req, res, next) => {
  const result = team_list()
  return result.then(dataList => {
    res.json(
      new SuccessModel(dataList)
    )
  })
})

// 修改团队名
router.post('/editTeam', loginCheck, (req, res, next) => {
  const {
    member_name
  } = req.session
  const {
    teamName,
    preName
  } = req.body

  const result = edit_team(member_name, teamName, preName)

  return result.then((data) => {
    if (data) {
      res.json(
        new SuccessModel('修改成功')
      )
    } else {
      res.json(
        new ErrorModel('你不是该团队成员，没有权限修改团队名')
      )
    }
  })
})


// 删除团队
router.post('/deleteTeam', loginCheck, (req, res, next) => {
  const {
    member_name
  } = req.session
  const {
    teamName
  } = req.body

  const result = delete_team(member_name, teamName)

  return result.then((data) => {
    if (data) {
      res.json(
        new SuccessModel('删除成功')
      )
    } else {
      res.json(
        new ErrorModel('只有超级管理员才可以删除团队')
      )
    }
  })
})


// 根据团队名字查询对应团队成员信息
router.post('/teamMembersList', loginCheck, (req, res, next) => {
  const {
    teamName
  } = req.body
  const result = team_members_list(teamName)
  return result.then(dataList => {
    res.json(
      new SuccessModel(dataList)
    )
  })
})

// 查询没有加入任何团队的成员
router.post('/noTeam', loginCheck, (req, res, next) => {
  const {
    email
  } = req.body
  const result = noteam_member(email)
  return result.then(dataList => {
    res.json(
      new SuccessModel(dataList)
    )
  })
})

// 查询当前成员所在团队
router.get('/getCurrentTeam', loginCheck, (req, res, next) => {
  const member_name = req.session.member_name
  const result = get_currentteam(member_name)
  return result.then(data => {
    res.json(
      new SuccessModel(data)
    )
  })
})

// 邀请团队成员
// teanName:团队名;memberId:被邀请成员Id
router.post('/inviteMember', loginCheck, (req, res, next) => {
  const {
    member_name
  } = req.session
  const {
    teamName,
    memberId
  } = req.body
  const result = invite_member(member_name, teamName, memberId)

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
router.post('/deleteMember', loginCheck, (req, res, next) => {
  const {
    member_name
  } = req.session
  const {
    teamName,
    memberId
  } = req.body
  const result = delete_member(teamName, memberId, member_name)
  return result.then((data) => {
    if (data) {
      res.json(
        new SuccessModel('移除成功')
      )
    } else {
      res.json(
        new ErrorModel('你不是该团队队长，没有权限移除')
      )
    }
  })
})

module.exports = router;