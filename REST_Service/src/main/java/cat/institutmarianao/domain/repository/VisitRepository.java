package cat.institutmarianao.domain.repository;

import java.util.List;

import javax.ejb.Local;

import cat.institutmarianao.domain.Visit;

@Local
public interface VisitRepository {

	List<Visit> getAll();

	void add(Visit visit);

	void update(Visit visit);

	void delete(Visit visit);

	Visit getVisitByVisitId(int visitId);

	List<Visit> getVisitsByPatientId(int patientId);

	List<Visit> getVisitsByDate(String date);

	List<Visit> getVisitsByDoctorId(int doctorId);

	List<Visit> getVisitsByDoctorIdAndDate(int doctorId, String date);

	List<Visit> getVisitsCompletedByPatientId(int patientId);

	List<Visit> getVisitsIncompletedByPatientId(int patientId);

	List<Visit> getIncompletedVisitsByDoctorIdAndDate(int doctorId, String date);
}
