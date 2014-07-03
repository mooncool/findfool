package zpl.oj.dao;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import zpl.oj.model.common.Problem;

public interface ProblemDao {

	@Select("    select  UUID,  PROBLEM_ID as problemId, belong, TITLE,  DESCRIPTION,  DATE,  "
			+ "PROBLEM_SET_ID,  CREATOR, TYPE,  LIMIT_TIME,  LIMIT_MEM,  SUBMIT,  SLOVED,   MODIFIER,   MODIFYDATE  FROM PROBLEM  WHERE problem_Id = #{id}")
	  Problem getProblem(int id);
	
	@Select("    select  UUID,  PROBLEM_ID as problemId, belong, TITLE,  DESCRIPTION,  DATE,  "
			+ "PROBLEM_SET_ID,  CREATOR, TYPE,  LIMIT_TIME,  LIMIT_MEM,  SUBMIT,  SLOVED,   MODIFIER,   MODIFYDATE"
			+ "  FROM PROBLEM  "
			+ "WHERE uuid=(select uuid from problem where PROBLEM_ID=#{0})"
			+ " order by PROBLEM_ID DESC limit 1")
	  Problem getNewestProblemByid(int id);
	  
	@Insert("    INSERT INTO PROBLEM("
			+ " UUID, belong,PROBLEM_ID,   TITLE,   DESCRIPTION,   DATE,   PROBLEM_SET_ID,  CREATOR,   TYPE,   LIMIT_TIME, "
			+ "  LIMIT_MEM,   SUBMIT,   SLOVED,   MODIFIER,   MODIFYDATE)"
			+ " VALUES( #{uuid},#{belong}, #{problemId},  #{title},  #{description},  #{date},  #{problemSetId},  #{creator},  #{type},  "
			+ "#{limitTime},  #{limitMem},  #{submit},  #{sloved},  #{modifier},  #{modifydate})")
	  void insertProblem(Problem problem);	  
	   
	
	@Update("    update PROBLEM set "
			+ " UUID = #{uuid} where problem_id=#{problemId}")
	  void updateProblem(Problem problem);	
	
	@Select("select problem_id from PROBLEM where creator=#{creator} ORDER BY problem_id DESC limit 1")
	Integer getProblemId(int creator);
	
	
	@Select("    select  UUID,  PROBLEM_ID as problemId,  TITLE,  DESCRIPTION,  DATE,  "
			+ "PROBLEM_SET_ID,  CREATOR, TYPE,  LIMIT_TIME,  LIMIT_MEM,  SUBMIT,  SLOVED,   MODIFIER,   MODIFYDATE  FROM PROBLEM"
			+ " WHERE creator=${uid} limit ${begin},${end}")
	  List<Problem> getProblemsByCreator(int uid,int begin,int end);  

	  
	  /**主要用于分页，可返回总记录数*/
	@Select("    select  COUNT(*) FROM PROBLEM"
			+ " WHERE creator=${uid}")
	  Integer selectCount(int uid);  
	    
	}