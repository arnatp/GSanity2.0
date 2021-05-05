package cat.institutmarianao.domain.repository.impl;

import java.time.LocalDate;
import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;

import cat.institutmarianao.domain.Visit;
import cat.institutmarianao.domain.repository.VisitRepository;

@Stateless
public class VisitRepositoryImpl implements VisitRepository {

	@PersistenceContext
	private EntityManager entityManager;

	@SuppressWarnings("unchecked")
	@Override
	public List<Visit> getAll() {
		return entityManager.createNamedQuery("Visit.findAll").getResultList();
	}

	@Override
	public void add(Visit visit) {
		entityManager.persist(visit);
	}

	@Override
	public void update(Visit visit) {
		entityManager.merge(visit);
	}

	@Override
	public void delete(Visit visit) {
		Visit visit1 = entityManager.merge(visit);
		entityManager.remove(visit1);
	}

	@Override
	public Visit getVisitByVisitId(int visitId) {
		try {
			return (Visit) entityManager.createNamedQuery("Visit.findByVisitId").setParameter("visitId", visitId)
					.getSingleResult();
		} catch (NoResultException e) {
			return null;
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Visit> getVisitsByDate(String date) {
		try {
			String[] dataSplited = date.split("-");
			int year = Integer.parseInt(dataSplited[0]);
			int month = Integer.parseInt(dataSplited[1]);
			int day = Integer.parseInt(dataSplited[2]);
			LocalDate dateFormatted = LocalDate.of(year, month, day);
			return entityManager.createNamedQuery("Visit.findByDate").setParameter("date", dateFormatted)
					.getResultList();
		} catch (NoResultException e) {
			return null;
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Visit> getVisitsByDoctorId(int doctorId) {
		try {
			return entityManager.createNamedQuery("Visit.findByDoctorId").setParameter("doctorId", doctorId)
					.getResultList();
		} catch (NoResultException e) {
			return null;
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Visit> getVisitsByPatientId(int patientId) {
		try {
			return entityManager.createNamedQuery("Visit.findByPatientId").setParameter("patientId", patientId)
					.getResultList();
		} catch (NoResultException e) {
			return null;
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Visit> getVisitsByDoctorIdAndDate(int doctorId, String date) {
		try {
			String[] dataSplited = date.split("-");
			int year = Integer.parseInt(dataSplited[0]);
			int month = Integer.parseInt(dataSplited[1]);
			int day = Integer.parseInt(dataSplited[2]);
			LocalDate dateFormatted = LocalDate.of(year, month, day);
			return entityManager.createNamedQuery("Visit.findByDoctorIdAndDate").setParameter("doctorId", doctorId)
					.setParameter("date", dateFormatted).getResultList();
		} catch (NoResultException e) {
			return null;
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Visit> getVisitsCompletedByPatientId(int patientId) {
		try {
			return entityManager.createNamedQuery("Visit.findByPatientIdCompleted").setParameter("patientId", patientId)
					.getResultList();
		} catch (NoResultException e) {
			return null;
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Visit> getVisitsIncompletedByPatientId(int patientId) {
		try {
			return entityManager.createNamedQuery("Visit.findByPatientIdIncompleted")
					.setParameter("patientId", patientId).getResultList();
		} catch (NoResultException e) {
			return null;
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Visit> getIncompletedVisitsByDoctorIdAndDate(int doctorId, String date) {
		try {
			String[] dataSplited = date.split("-");
			int year = Integer.parseInt(dataSplited[0]);
			int month = Integer.parseInt(dataSplited[1]);
			int day = Integer.parseInt(dataSplited[2]);
			LocalDate dateFormatted = LocalDate.of(year, month, day);
			return entityManager.createNamedQuery("Visit.findByDoctorIdAndDateIncompleted")
					.setParameter("doctorId", doctorId).setParameter("date", dateFormatted).getResultList();
		} catch (NoResultException e) {
			return null;
		}
	}

}