import { ApiCmd } from './api-service-cmd';
import { HttpClient } from '../core/http/http-client';
import { LOCAL_STORAGE_KEY } from '../constant/app-constant';
import { ParamBuilder } from '../core/http/param-builder';
import { ParamsKey } from '../constant/paramskey';

export class ApiService extends HttpClient {
  mUrl: string = ParamsKey.URL;

  userID = localStorage.getItem(LOCAL_STORAGE_KEY.USER_INFO)
    ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.USER_INFO)).id
    : -1;
  username = localStorage.getItem(LOCAL_STORAGE_KEY.USER_INFO)
    ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.USER_INFO)).username
    : '';

  itemPerPage = localStorage.getItem('item-per-page')
    ? JSON.parse(localStorage.getItem('item-per-page'))
    : 10;

  public static _instance: ApiService = null;

  constructor() {
    super();
  }

  public setData(data) {
    super.setData(data);
    if (data) {
      if ('http' in data) {
        let http = data['http'];

        this.mUrl = http[http['api_server']].host;

        this.setDebugEnable(http['debug']);
      }
    }
  }

  public setItemPerPage(itemPerPage) {
    super.setData(itemPerPage);
    if (itemPerPage) {
      localStorage.setItem('item-per-page', itemPerPage);
      this.itemPerPage = itemPerPage;
    }
  }

  public setUserInfo(userInfo) {
    super.setData(userInfo);
    if (userInfo) {
      localStorage.setItem(
        LOCAL_STORAGE_KEY.USER_INFO,
        JSON.stringify(userInfo)
      );
      this.userID = userInfo.id;
      this.username = userInfo.username;
    }
  }

  //===================================================================================
  public sendRequestLOGIN(username: string, password: string): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.LOGIN,
      ParamBuilder.builder().add('userName', username).add('password', password)
    );
  }

  //===================================================================================
  public sendRequestGET_LIST_TBL_LOAICHAMCONG(
    page,
    dataSearch,
    type
  ): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.GET_LIST_TBL_LOAICHAMCONG,
      ParamBuilder.builder()
        .add('itemPerPage', this.itemPerPage)
        .add('dataSearch', dataSearch)
        .add('type', type)
        .add('page', page)
    );
  }

  //===================================================================================
  public sendRequestGET_LIST_TBL_DM_TINHTRANGNV(
    page,
    dataSearch
  ): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.GET_LIST_TBL_DM_TINHTRANGNV,
      ParamBuilder.builder()
        .add('itemPerPage', this.itemPerPage)
        .add('dataSearch', dataSearch)
        .add('page', page)
    );
  }

  //===================================================================================
  public sendRequestGET_LIST_TBL_DM_BOPHAN(page, dataSearch): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.GET_LIST_TBL_DM_BOPHAN,
      ParamBuilder.builder()
        .add('itemPerPage', this.itemPerPage)
        .add('dataSearch', dataSearch)
        .add('page', page)
    );
  }

  //===================================================================================
  public sendRequestGET_LIST_TBL_NGHILE(page, dataSearch): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.GET_LIST_TBL_NGHILE,
      ParamBuilder.builder()
        .add('itemPerPage', this.itemPerPage)
        .add('dataSearch', dataSearch)
        .add('page', page)
        .add('type', 'holiday')
    );
  }

  //===================================================================================
  public sendRequestGET_LIST_TBL_DMGIADINH(idNhanVien): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.GET_LIST_TBL_DMGIADINH,
      ParamBuilder.builder().add('idNhanVien', idNhanVien)
    );
  }

  //===================================================================================
  public sendRequestGET_DETAIL_TBL_QUYETDINH_TANGLUONG(
    idNhanVien
  ): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.GET_DETAIL_TBL_QUYETDINH_TANGLUONG,
      ParamBuilder.builder().add('idNhanVien', idNhanVien)
    );
  }

  //===================================================================================
  public sendRequestGET_LIST_TBL_PRE_TRAINING(idNhanVien): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.GET_LIST_TBL_PRE_TRAINING,
      ParamBuilder.builder().add('idNhanVien', idNhanVien)
    );
  }

  //===================================================================================
  public sendRequestGET_LIST_TBL_TRAINING_AFTER(idNhanVien): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.GET_LIST_TBL_TRAINING_AFTER,
      ParamBuilder.builder().add('idNhanVien', idNhanVien)
    );
  }

  //===================================================================================
  public sendRequestGET_LIST_TBL_WORK_HISTORY(idNhanVien): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.GET_LIST_TBL_WORK_HISTORY,
      ParamBuilder.builder().add('idNhanVien', idNhanVien)
    );
  }

  //===================================================================================
  public sendRequestGET_LIST_HOPDONG_NHANSU_DETAIL(idNhanVien): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.GET_LIST_HOPDONG_NHANSU_DETAIL,
      ParamBuilder.builder().add('idNhanVien', idNhanVien)
    );
  }

  //===================================================================================
  public sendRequestGET_LIST_TBL_BANGLUONG(date): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.GET_LIST_TBL_BANGLUONG,
      ParamBuilder.builder().add('date', date)
    );
  }

  //===================================================================================
  public sendRequestDATA_TIMEKEEPING(date): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.DATA_TIMEKEEPING,
      ParamBuilder.builder().add('date', date)
    );
  }

  //===================================================================================
  public sendRequestGET_LIST_TBL_MUCDONG_BAOHIEM(
    page,
    dataSearch
  ): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.GET_LIST_TBL_MUCDONG_BAOHIEM,
      ParamBuilder.builder()
        .add('itemPerPage', this.itemPerPage)
        .add('dataSearch', dataSearch)
        .add('page', page)
    );
  }

  //===================================================================================
  public sendRequestADD_TBL_WORK_HISTORY(obj): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.ADD_TBL_WORK_HISTORY,
      ParamBuilder.builder()
        .add('idNhanVien', obj.idNhanVien)
        .addIgnoreNull('describe', obj.describe)
        .addIgnoreNull('status', obj.status)
        .addIgnoreNull('dateStart', obj.dateStart)
        .addIgnoreNull('dateEnd', obj.dateEnd)
    );
  }

  //===================================================================================
  public sendRequestADD_TBL_MUCDONG_BAOHIEM(obj): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.ADD_TBL_MUCDONG_BAOHIEM,
      ParamBuilder.builder()
        .addIgnoreNull('companyBHXH', obj.companyBHXH)
        .addIgnoreNull('companyBHYT', obj.companyBHYT)
        .addIgnoreNull('companyBHTN', obj.companyBHTN)
        .addIgnoreNull('staffBHXH', obj.staffBHXH)
        .addIgnoreNull('staffBHYT', obj.staffBHYT)
        .addIgnoreNull('staffBHTN', obj.staffBHTN)
        .addIgnoreNull('dateStart', obj.dateStart)
        .addIgnoreNull('dateEnd', obj.dateEnd)
    );
  }

  //===================================================================================
  public sendRequestUPDATE_TBL_MUCDONG_BAOHIEM(obj): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.UPDATE_TBL_MUCDONG_BAOHIEM,
      ParamBuilder.builder()
        .addIgnoreNull('companyBHXH', obj.companyBHXH)
        .addIgnoreNull('companyBHYT', obj.companyBHYT)
        .addIgnoreNull('companyBHTN', obj.companyBHTN)
        .addIgnoreNull('staffBHXH', obj.staffBHXH)
        .addIgnoreNull('staffBHYT', obj.staffBHYT)
        .addIgnoreNull('staffBHTN', obj.staffBHTN)
        .addIgnoreNull('dateStart', obj.dateStart)
        .addIgnoreNull('dateEnd', obj.dateEnd)
        .add('id', obj.id)
    );
  }

  //===================================================================================
  public sendRequestUPDATE_TBL_WORK_HISTORY(obj): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.UPDATE_TBL_WORK_HISTORY,
      ParamBuilder.builder()
        .addIgnoreNull('id', obj.id)
        .addIgnoreNull('describe', obj.describe)
        .addIgnoreNull('status', obj.status)
        .addIgnoreNull('dateStart', obj.dateStart)
        .addIgnoreNull('dateEnd', obj.dateEnd)
    );
  }

  //===================================================================================
  public sendRequestADD_TBL_NGHIPHEP(obj): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.ADD_TBL_NGHIPHEP,
      ParamBuilder.builder()
        .add('idNhanVien', obj.idNhanVien)
        .add('idLoaiChamCong', obj.idLoaiChamCong)
        .addIgnoreNull('dateStart', obj.dateStart)
        .addIgnoreNull('dateEnd', obj.dateEnd)
    );
  }

  //===================================================================================
  public sendRequestUPDATE_TBL_NGHIPHEP(obj): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.UPDATE_TBL_NGHIPHEP,
      ParamBuilder.builder()
        .add('idNhanVien', obj.idNhanVien)
        .add('id', obj.id)
        .add('idLoaiChamCong', obj.idLoaiChamCong)
        .addIgnoreNull('dateStart', obj.dateStart)
        .addIgnoreNull('dateEnd', obj.dateEnd)
    );
  }

  //===================================================================================
  public sendRequestGET_LIST_TBL_DM_CHINHANH(page, dataSearch): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.GET_LIST_TBL_DM_CHINHANH,
      ParamBuilder.builder()
        .add('itemPerPage', this.itemPerPage)
        .add('dataSearch', dataSearch)
        .add('page', page)
    );
  }

  //===================================================================================
  public sendRequestGET_LIST_TBL_LOAIHOPDONG(page, dataSearch): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.GET_LIST_TBL_LOAIHOPDONG,
      ParamBuilder.builder()
        .add('itemPerPage', this.itemPerPage)
        .add('dataSearch', dataSearch)
        .add('page', page)
    );
  }

  //===================================================================================
  public sendRequestGET_LIST_TBL_DMNHANVIEN(page, dataSearch): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.GET_LIST_TBL_DMNHANVIEN,
      ParamBuilder.builder()
        .add('itemPerPage', this.itemPerPage)
        .add('dataSearch', dataSearch)
        .add('page', page)
    );
  }

  //===================================================================================
  public sendRequestGET_LIST_TBL_QUYETDINH_TANGLUONG(
    page,
    dataSearch
  ): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.GET_LIST_TBL_QUYETDINH_TANGLUONG,
      ParamBuilder.builder()
        .add('itemPerPage', this.itemPerPage)
        .add('dataSearch', dataSearch)
        .add('page', page)
    );
  }

  //===================================================================================
  public sendRequestGET_LIST_TBL_HOPDONG_NHANSU(
    page,
    dataSearch
  ): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.GET_LIST_TBL_HOPDONG_NHANSU,
      ParamBuilder.builder()
        .add('itemPerPage', this.itemPerPage)
        .add('dataSearch', dataSearch)
        .add('page', page)
    );
  }

  //===================================================================================
  public sendRequestGET_LIST_TBL_NGHIPHEP(page, dataSearch): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.GET_LIST_TBL_NGHIPHEP,
      ParamBuilder.builder()
        .add('itemPerPage', this.itemPerPage)
        .add('dataSearch', dataSearch)
        .add('page', page)
    );
  }

  //===================================================================================
  public sendRequestUPDATE_TIMEKEEPING(id, status): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.UPDATE_TIMEKEEPING,
      ParamBuilder.builder().add('id', id).add('status', status)
    );
  }

  //===================================================================================
  public sendRequestGET_LIST_NAME_TBL_DMNHANVIEN(): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.GET_LIST_NAME_TBL_DMNHANVIEN,
      ParamBuilder.builder()
    );
  }

  //===================================================================================
  public sendRequestADD_TBL_LOAICHAMCONG(obj): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.ADD_TBL_LOAICHAMCONG,
      ParamBuilder.builder()
        .add('code', obj.code)
        .add('name', obj.name)
        .addIgnoreNull('description', obj.description)
        .add('type', obj.type)
    );
  }

  //===================================================================================
  public sendRequestADD_TBL_QUYETDINH_TANGLUONG(obj): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.ADD_TBL_QUYETDINH_TANGLUONG,
      ParamBuilder.builder()
        .add('idNhanVien', obj.idNhanVien)
        .addIgnoreNull('decisionCode', obj.decisionCode)
        .addIgnoreNull('decisionDate', obj.decisionDate)
        .addIgnoreNull('IncreaseDate', obj.IncreaseDate)
        .addIgnoreNull('stopDate', obj.stopDate)
        .addIgnoreNull('stopReason', obj.stopReason)
        .addIgnoreNull('salaryIncrease', obj.salaryIncrease)
        .addIgnoreNull('status', obj.status)
    );
  }

  //===================================================================================
  public sendRequestUPDATE_TBL_QUYETDINH_TANGLUONG(obj): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.UPDATE_TBL_QUYETDINH_TANGLUONG,
      ParamBuilder.builder()
        .add('id', obj.id)
        .addIgnoreNull('decisionCode', obj.decisionCode)
        .addIgnoreNull('decisionDate', obj.decisionDate)
        .addIgnoreNull('IncreaseDate', obj.IncreaseDate)
        .addIgnoreNull('stopDate', obj.stopDate)
        .addIgnoreNull('stopReason', obj.stopReason)
        .addIgnoreNull('status', obj.status)
        .addIgnoreNull('salaryIncrease', obj.salaryIncrease)
    );
  }

  //===================================================================================
  public sendRequestADD_TBL_TRAINING_AFTER(obj): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.ADD_TBL_TRAINING_AFTER,
      ParamBuilder.builder()
        .add('idNhanVien', obj.idNhanVien)
        .addIgnoreNull('dateStart', obj.dateStart)
        .addIgnoreNull('dateEnd', obj.dateEnd)
        .addIgnoreNull('trainingCourse', obj.trainingCourse)
        .addIgnoreNull('companyCost', obj.companyCost)
        .addIgnoreNull('result', obj.result)
        .addIgnoreNull('staffCost', obj.staffCost)
        .addIgnoreNull('majors', obj.majors)
        .addIgnoreNull('rangeDate', obj.rangeDate)
        .addIgnoreNull('expirationDate', obj.expirationDate)
        .addIgnoreNull('formTraining', obj.formTraining)
        .addIgnoreNull('numberCertificates', obj.numberCertificates)
    );
  }

  //===================================================================================
  public sendRequestUPDATE_TBL_TRAINING_AFTER(obj): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.UPDATE_TBL_TRAINING_AFTER,
      ParamBuilder.builder()
        .add('id', obj.id)
        .addIgnoreNull('dateStart', obj.dateStart)
        .addIgnoreNull('dateEnd', obj.dateEnd)
        .addIgnoreNull('trainingCourse', obj.trainingCourse)
        .addIgnoreNull('companyCost', obj.companyCost)
        .addIgnoreNull('result', obj.result)
        .addIgnoreNull('staffCost', obj.staffCost)
        .addIgnoreNull('majors', obj.majors)
        .addIgnoreNull('rangeDate', obj.rangeDate)
        .addIgnoreNull('expirationDate', obj.expirationDate)
        .addIgnoreNull('numberCertificates', obj.numberCertificates)
        .addIgnoreNull('formTraining', obj.formTraining)
    );
  }

  //===================================================================================
  public sendRequestADD_TBL_DM_CHINHANH(obj): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.ADD_TBL_DM_CHINHANH,
      ParamBuilder.builder()
        .add('branchName', obj.branchName)
        .add('branchCode', obj.branchCode)
        .add('address', obj.address)
        .add('phoneNumber', obj.phoneNumber)
        .add('faxNumber', obj.faxNumber)
        .add('email', obj.email)
    );
  }

  //===================================================================================
  public sendRequestADD_TBL_HOPDONG_NHANSU(obj): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.ADD_TBL_HOPDONG_NHANSU,
      ParamBuilder.builder()
        .add('idNhanVien', obj.idNhanVien)
        .addIgnoreNull('contractCode', obj.contractCode)
        .addIgnoreNull('idLoaiHopDong', obj.idLoaiHopDong)
        .addIgnoreNull('signDate', obj.signDate)
        .addIgnoreNull('salaryNumber', obj.salaryNumber)
        .addIgnoreNull('contractDateEnd', obj.contractDateEnd)
        .addIgnoreNull('status', obj.status)
    );
  }

  //===================================================================================
  public sendRequestUPDATE_TBL_HOPDONG_NHANSU(obj): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.UPDATE_TBL_HOPDONG_NHANSU,
      ParamBuilder.builder()
        .add('id', obj.id)
        .addIgnoreNull('contractCode', obj.contractCode)
        .addIgnoreNull('idLoaiHopDong', obj.idLoaiHopDong)
        .addIgnoreNull('signDate', obj.signDate)
        .addIgnoreNull('salaryNumber', obj.salaryNumber)
        .addIgnoreNull('contractDateEnd', obj.contractDateEnd)
        .addIgnoreNull('status', obj.status)
    );
  }

  //===================================================================================
  public sendRequestUPDATE_TBL_DM_CHINHANH(obj): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.UPDATE_TBL_DM_CHINHANH,
      ParamBuilder.builder()
        .add('branchName', obj.branchName)
        .add('id', obj.id)
        .add('branchCode', obj.branchCode)
        .add('address', obj.address)
        .add('phoneNumber', obj.phoneNumber)
        .add('faxNumber', obj.faxNumber)
        .add('email', obj.email)
    );
  }

  //===================================================================================
  public sendRequestADD_TBL_DM_TINHTRANGNV(obj): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.ADD_TBL_DM_TINHTRANGNV,
      ParamBuilder.builder()
        .add('statusCode', obj.statusCode)
        .add('statusName', obj.statusName)
        .addIgnoreNull('description', obj.description)
    );
  }

  //===================================================================================
  public sendRequestADD_TBL_DMNHANVIEN(obj): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.ADD_TBL_DMNHANVIEN,
      ParamBuilder.builder()
        .addIgnoreNull('address', obj.address)
        .addIgnoreNull('age', obj.age)
        .addIgnoreNull('bankName', obj.bankName)
        .addIgnoreNull('bankNumber', obj.bankNumber)
        .addIgnoreNull('bhxhSalary', obj.bhxhSalary)
        .addIgnoreNull('birthday', obj.birthday)
        .addIgnoreNull('cmndNumber', obj.cmndNumber)
        .addIgnoreNull('contactUrgent', obj.contactUrgent)
        .addIgnoreNull('contractCode', obj.contractCode)
        .addIgnoreNull('contractDateEnd', obj.contractDateEnd)
        .addIgnoreNull('degree', obj.degree)
        .addIgnoreNull('gender', obj.gender)
        .addIgnoreNull('idBoPhan', obj.idBoPhan)
        .addIgnoreNull('idChucVu', obj.idChucVu)
        .addIgnoreNull('idLoaiHopDong', obj.idLoaiHopDong)
        .addIgnoreNull('idMayChamCong', obj.idMayChamCong)
        .addIgnoreNull('idNation', obj.idNation)
        .addIgnoreNull('permanentResidence', obj.permanentResidence)
        .addIgnoreNull('phoneNumber', obj.phoneNumber)
        .addIgnoreNull('probationaryDate', obj.probationaryDate)
        .addIgnoreNull('probationarySalary', obj.probationarySalary)
        .addIgnoreNull('signDate', obj.signDate)
        .addIgnoreNull('staffCode', obj.staffCode)
        .addIgnoreNull('staffName', obj.staffName)
        .addIgnoreNull('status', obj.status)
        .addIgnoreNull('taxCode', obj.taxCode)
        .addIgnoreNull('workingDate', obj.workingDate)
        .addIgnoreNull('workingSalary', obj.workingSalary)
        .addIgnoreNull('email', obj.email)
    );
  }

  //===================================================================================
  public sendRequestUPDATE_TBL_DMNHANVIEN(obj): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.UPDATE_TBL_DMNHANVIEN,
      ParamBuilder.builder()
        .addIgnoreNull('address', obj.address)
        .addIgnoreNull('age', obj.age)
        .addIgnoreNull('bankName', obj.bankName)
        .addIgnoreNull('bankNumber', obj.bankNumber)
        .addIgnoreNull('bhxhSalary', obj.bhxhSalary)
        .addIgnoreNull('birthday', obj.birthday)
        .addIgnoreNull('cmndNumber', obj.cmndNumber)
        .addIgnoreNull('contactUrgent', obj.contactUrgent)
        .addIgnoreNull('contractCode', obj.contractCode)
        .addIgnoreNull('contractDateEnd', obj.contractDateEnd)
        .addIgnoreNull('degree', obj.degree)
        .addIgnoreNull('gender', obj.gender)
        .addIgnoreNull('idBoPhan', obj.idBoPhan)
        .addIgnoreNull('idChucVu', obj.idChucVu)
        .addIgnoreNull('idLoaiHopDong', obj.idLoaiHopDong)
        .addIgnoreNull('idMayChamCong', obj.idMayChamCong)
        .addIgnoreNull('idNation', obj.idNation)
        .addIgnoreNull('idContract', obj.idContract)
        .addIgnoreNull('permanentResidence', obj.permanentResidence)
        .addIgnoreNull('phoneNumber', obj.phoneNumber)
        .addIgnoreNull('probationaryDate', obj.probationaryDate)
        .addIgnoreNull('probationarySalary', obj.probationarySalary)
        .addIgnoreNull('signDate', obj.signDate)
        .addIgnoreNull('staffCode', obj.staffCode)
        .addIgnoreNull('staffName', obj.staffName)
        .addIgnoreNull('status', obj.status)
        .addIgnoreNull('taxCode', obj.taxCode)
        .addIgnoreNull('workingDate', obj.workingDate)
        .addIgnoreNull('workingSalary', obj.workingSalary)
        .add('id', obj.id)
        .addIgnoreNull('email', obj.email)
    );
  }

  //===================================================================================
  public sendRequestADD_TBL_DM_BOPHAN(obj): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.ADD_TBL_DM_BOPHAN,
      ParamBuilder.builder()
        .add('departmentCode', obj.departmentCode)
        .add('departmentName', obj.departmentName)
        .add('idChiNhanh', obj.idChiNhanh)
    );
  }

  //===================================================================================
  public sendRequestUPDATE_TBL_DM_TINHTRANGNV(obj): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.UPDATE_TBL_DM_TINHTRANGNV,
      ParamBuilder.builder()
        .add('statusCode', obj.statusCode)
        .add('statusName', obj.statusName)
        .add('id', obj.id)
        .addIgnoreNull('description', obj.description)
    );
  }

  //===================================================================================
  public sendRequestADD_TBL_NGHILE(obj): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.ADD_TBL_NGHILE,
      ParamBuilder.builder()
        .add('idLoaiChamCong', obj.idLoaiChamCong)
        .add('dateStartHoliday', obj.dateStartHoliday)
        .add('dateEndHoliday', obj.dateEndHoliday)
        .add('nameHoliday', obj.nameHoliday)
        .add('describe', obj.describe)
    );
  }

  //===================================================================================
  public sendRequestUPDATE_TBL_NGHILE(obj): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.UPDATE_TBL_NGHILE,
      ParamBuilder.builder()
        .add('idLoaiChamCong', obj.idLoaiChamCong)
        .add('dateStartHoliday', obj.dateStartHoliday)
        .add('dateEndHoliday', obj.dateEndHoliday)
        .add('nameHoliday', obj.nameHoliday)
        .add('describe', obj.describe)
        .add('id', obj.id)
    );
  }

  //===================================================================================
  public sendRequestADD_TBL_PRE_TRAINING(obj): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.ADD_TBL_PRE_TRAINING,
      ParamBuilder.builder()
        .add('idNhanVien', obj.idNhanVien)
        .addIgnoreNull('dateStart', obj.dateStart)
        .addIgnoreNull('dateEnd', obj.dateEnd)
        .addIgnoreNull('trainingPlace', obj.trainingPlace)
        .addIgnoreNull('major', obj.major)
        .addIgnoreNull('degree', obj.degree)
    );
  }

  //===================================================================================
  public sendRequestUPDATE_TBL_PRE_TRAINING(obj): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.UPDATE_TBL_PRE_TRAINING,
      ParamBuilder.builder()
        .addIgnoreNull('dateStart', obj.dateStart)
        .addIgnoreNull('dateEnd', obj.dateEnd)
        .addIgnoreNull('trainingPlace', obj.trainingPlace)
        .addIgnoreNull('major', obj.major)
        .addIgnoreNull('degree', obj.degree)
        .add('id', obj.id)
    );
  }

  //===================================================================================
  public sendRequestUPDATE_TBL_LOAIHOPDONG(obj): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.UPDATE_TBL_LOAIHOPDONG,
      ParamBuilder.builder()
        .addIgnoreNull('maLoaiHD', obj.maLoaiHD)
        .addIgnoreNull('tenLoaiHD', obj.tenLoaiHD)
        .add('id', obj.id)
    );
  }

  //===================================================================================
  public sendRequestADD_TBL_LOAIHOPDONG(obj): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.ADD_TBL_LOAIHOPDONG,
      ParamBuilder.builder()
        .addIgnoreNull('maLoaiHD', obj.maLoaiHD)
        .addIgnoreNull('tenLoaiHD', obj.tenLoaiHD)
    );
  }

  //===================================================================================
  public sendRequestGET_LIST_NAME_TBL_LOAIHOPDONG(): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.GET_LIST_NAME_TBL_LOAIHOPDONG,
      ParamBuilder.builder()
    );
  }

  //===================================================================================
  public sendRequestGET_LIST_NAME_TBL_LOAICHAMCONG(type): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.GET_LIST_NAME_TBL_LOAICHAMCONG,
      ParamBuilder.builder().add('type', type)
    );
  }

  //===================================================================================
  public sendRequestADD_TBL_DMGIADINH(obj): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.ADD_TBL_DMGIADINH,
      ParamBuilder.builder()
        .addIgnoreNull('relationship', obj.relationship)
        .addIgnoreNull('name', obj.name)
        .addIgnoreNull('gender', obj.gender)
        .addIgnoreNull('birthday', obj.birthday)
        .addIgnoreNull('idNhanVien', obj.idNhanVien)
        .addIgnoreNull('cmndNumber', obj.cmndNumber)
        .addIgnoreNull('address', obj.address)
        .addIgnoreNull('workplace', obj.workplace)
        .addIgnoreNull('reduce', obj.reduce)
    );
  }

  //===================================================================================
  public sendRequestUPDATE_TBL_DMGIADINH(obj): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.UPDATE_TBL_DMGIADINH,
      ParamBuilder.builder()
        .addIgnoreNull('relationship', obj.relationship)
        .addIgnoreNull('name', obj.name)
        .addIgnoreNull('gender', obj.gender)
        .addIgnoreNull('birthday', obj.birthday)
        .addIgnoreNull('idNhanVien', obj.idNhanVien)
        .addIgnoreNull('cmndNumber', obj.cmndNumber)
        .addIgnoreNull('address', obj.address)
        .addIgnoreNull('workplace', obj.workplace)
        .addIgnoreNull('reduce', obj.reduce)
        .add('id', obj.id)
    );
  }

  //===================================================================================
  public sendRequestUPDATE_TBL_LOAICHAMCONG(obj): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.UPDATE_TBL_LOAICHAMCONG,
      ParamBuilder.builder()
        .add('code', obj.code)
        .add('name', obj.name)
        .addIgnoreNull('description', obj.description)
        .add('id', obj.id)
        .add('type', obj.type)
    );
  }

  //===================================================================================
  public sendRequestDETAIL_TBL_DMNHANVIEN(id): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.DETAIL_TBL_DMNHANVIEN,
      ParamBuilder.builder().add('id', id)
    );
  }

  //===================================================================================
  public sendRequestTRACK_INSURANCE_PREMIUMS(date): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.TRACK_INSURANCE_PREMIUMS,
      ParamBuilder.builder().add('date', date)
    );
  }

  //===================================================================================
  public sendRequestDELETE_TBL_LOAICHAMCONG(listID): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.DELETE_TBL_LOAICHAMCONG,
      ParamBuilder.builder().add('listID', listID)
    );
  }

  //===================================================================================
  public sendRequestDELETE_TBL_NGHIPHEP(listID): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.DELETE_TBL_NGHIPHEP,
      ParamBuilder.builder().add('listID', listID)
    );
  }

  //===================================================================================
  public sendRequestDELETE_TBL_MUCDONG_BAOHIEM(listID): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.DELETE_TBL_MUCDONG_BAOHIEM,
      ParamBuilder.builder().add('listID', listID)
    );
  }

  //===================================================================================
  public sendRequestDELETE_TBL_NGHILE(listID): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.DELETE_TBL_NGHILE,
      ParamBuilder.builder().add('listID', listID)
    );
  }

  //===================================================================================
  public sendRequestDELETE_TBL_WORK_HISTORY(listID): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.DELETE_TBL_WORK_HISTORY,
      ParamBuilder.builder().add('listID', listID)
    );
  }

  //===================================================================================
  public sendRequestDELETE_TBL_HOPDONG_NHANSU(listID): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.DELETE_TBL_HOPDONG_NHANSU,
      ParamBuilder.builder().add('listID', listID)
    );
  }

  //===================================================================================
  public sendRequestDELETE_TBL_TRAINING_AFTER(listID): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.DELETE_TBL_TRAINING_AFTER,
      ParamBuilder.builder().add('listID', listID)
    );
  }

  //===================================================================================
  public sendRequestDELETE_TBL_QUYETDINH_TANGLUONG(listID): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.DELETE_TBL_QUYETDINH_TANGLUONG,
      ParamBuilder.builder().add('listID', listID)
    );
  }

  //===================================================================================
  public sendRequestDELETE_TBL_DMGIADINH(listID): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.DELETE_TBL_DMGIADINH,
      ParamBuilder.builder().add('listID', listID)
    );
  }

  //===================================================================================
  public sendRequestDELETE_TBL_LOAIHOPDONG(listID): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.DELETE_TBL_LOAIHOPDONG,
      ParamBuilder.builder().add('listID', listID)
    );
  }

  //===================================================================================
  public sendRequestDELETE_TBL_PRE_TRAINING(listID): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.DELETE_TBL_PRE_TRAINING,
      ParamBuilder.builder().add('listID', listID)
    );
  }

  //===================================================================================
  public sendRequestDELETE_TBL_DM_TINHTRANGNV(listID): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.DELETE_TBL_DM_TINHTRANGNV,
      ParamBuilder.builder().add('listID', listID)
    );
  }

  //===================================================================================
  public sendRequestDELETE_TBL_DM_BOPHAN(listID): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.DELETE_TBL_DM_BOPHAN,
      ParamBuilder.builder().add('listID', listID)
    );
  }

  //===================================================================================
  public sendRequestDELETE_TBL_DMNHANVIEN(listID): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.DELETE_TBL_DMNHANVIEN,
      ParamBuilder.builder().add('listID', listID)
    );
  }

  //===================================================================================
  public sendRequestDELETE_TBL_DM_CHINHANH(listID): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.DELETE_TBL_DM_CHINHANH,
      ParamBuilder.builder().add('listID', listID)
    );
  }

  //===================================================================================
  public sendRequestGET_LIST_NAME_TBL_DM_CHINHANH(): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.GET_LIST_NAME_TBL_DM_CHINHANH,
      ParamBuilder.builder()
    );
  }

  //===================================================================================
  public sendRequestGET_LIST_NAME_TBL_DM_BOPHAN(): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.GET_LIST_NAME_TBL_DM_BOPHAN,
      ParamBuilder.builder()
    );
  }

  //===================================================================================
  public sendRequestGET_LIST_NAME_TBL_DMCHUCVU(): Promise<any> {
    return this.requestPost(
      this.mUrl + ApiCmd.GET_LIST_NAME_TBL_DMCHUCVU,
      ParamBuilder.builder()
    );
  }
}
