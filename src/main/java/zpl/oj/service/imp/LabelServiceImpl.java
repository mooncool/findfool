package zpl.oj.service.imp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import zpl.oj.dao.LabelDao;
import zpl.oj.dao.TestuserDao;
import zpl.oj.model.common.Label;
import zpl.oj.model.common.LabelUser;
import zpl.oj.model.common.Labeltest;
import zpl.oj.model.common.Testuser;
import zpl.oj.service.LabelService;

@Service
public class LabelServiceImpl implements LabelService {

	@Autowired
	private LabelDao labelDao;
	
	@Autowired
	private TestuserDao testuserDao;
	
	@Override
	public List<Integer> getSystemLabels() {
		// TODO Auto-generated method stub
		return labelDao.getSystemLabels();
	}

	@Override
	public void insertLabelToLabelTest( int testid, int labelid, int value) {
		// TODO Auto-generated method stub
		labelDao.insertLabelToLabelTest(testid, labelid, value);
	}

	@Override
	public String getLabelNameByLabelId(int labelid) {
		// TODO Auto-generated method stub
		return labelDao.getLabelNameByLabelId(labelid);
	}
	
	@Override
	public List<Labeltest> getLabelsOfTest(int testid) {
		// TODO Auto-generated method stub
		return labelDao.getLabelsOfTest(testid);
	}

	@Override
	public void updateLabelValue(int testid, int labelid, int value) {
		// TODO Auto-generated method stub
		labelDao.updateLabelValue(testid, labelid, value);
	}

	@Override
	public boolean isLableExist(String labelname) {
		List<Label> list=labelDao.getLabelByLabelName(labelname);
		if(list.size()==1) return true;
		else return false;
	}

	@Override
	public void insertNewLabel(int type, String labelname) {
		labelDao.insertNewLabel(1, labelname);		
	}

	@Override
	public Label getLabelByLabelName(String labelname) {
		// TODO Auto-generated method stub
		if(isLableExist(labelname))
		return labelDao.getLabelByLabelName(labelname).get(0);
		else return null;
	}

	@Override
	public boolean isLableTestExist(Integer testid,Integer labelid) {
		List<Labeltest> labeltests=labelDao.getLabelTestByTestidAndLabelName(testid,labelid);
		if(labeltests.size()==1) return true;
		else return false;
	}

	@Override
	public void insertIntoLabelUser(String userEmail, int labelid, String value) {
		// TODO Auto-generated method stub
		Testuser testuser=testuserDao.findTestuserByName(userEmail); 
		labelDao.insertIntoLabelUser(testuser.getTuid(), labelid, value);
	}

	@Override
	public Label getLabelById(Integer labelid) {
		// TODO Auto-generated method stub
		return labelDao.getLabelById(labelid);
	}

	@Override
	public LabelUser getLabelUserByTidAndLid(Integer testuserid, Integer labelid) {
		// TODO Auto-generated method stub
		return labelDao.getLabelUserByTidAndLid(testuserid, labelid);
	}

	@Override
	public void updateLabelUser(int testid, int labelid, String value) {
		// TODO Auto-generated method stub
		labelDao.updateLabelUser(testid, labelid, value);
	}

}
