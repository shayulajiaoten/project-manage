async function xxx() {

  const { mysql } = this.app;


  const connection = await mysql.getConnection();

  try {
      await connection.beginTransaction(); // 开始事务
      const ret1 = await connection.query('xxx');
      if (!ret1) {
          await connection.rollback();
          return false;
      }
      //一些处理
      const ret2 = await connection.query('UPDATE xx');

      if (!ret2 || ret2.affectedRows <= 0) {
          await connection.rollback();
          return false;
      }


      await connection.commit();
      return true;

  } catch (e) {
      await connection.rollback();
      return false;
  } finally {
      connection.release();
  }
}