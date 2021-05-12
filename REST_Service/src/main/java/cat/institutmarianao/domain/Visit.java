package cat.institutmarianao.domain;

import java.io.Serializable;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "visit")
@NamedQueries({ @NamedQuery(name = "Visit.findAll", query = "select u from Visit u"),
		@NamedQuery(name = "Visit.findByDate", query = "select u from Visit u where u.date = :date"),
		@NamedQuery(name = "Visit.findByVisitId", query = "select u from Visit u where u.visitId = :visitId"),
		@NamedQuery(name = "Visit.findByPatientId", query = "select u from Visit u where u.patient = (select pat from Patient pat where pat.userId = :patientId)"),
		@NamedQuery(name = "Visit.findByDoctorId", query = "select u from Visit u where u.doctor = (select doc from Doctor doc where doc.userId = :doctorId)"),
		@NamedQuery(name = "Visit.findByDoctorIdAndDate", query = "select u from Visit u where u.doctor = (Select doc from Doctor doc where doc.userId = :doctorId) and u.date = :date"),
		@NamedQuery(name = "Visit.findByPatientIdCompleted", query = "select u from Visit u where u.patient = (select pat from Patient pat where pat.userId = :patientId) and u.completed = 1"),
		@NamedQuery(name = "Visit.findByPatientIdIncompleted", query = "select u from Visit u where u.patient = (select pat from Patient pat where pat.userId = :patientId) and u.completed = 0"),
		@NamedQuery(name = "Visit.findByDoctorIdAndDateIncompleted", query = "select u from Visit u where u.doctor = (Select doc from Doctor doc where doc.userId = :doctorId) and u.date = :date and u.completed = 0"),
		@NamedQuery(name = "Visit.findNotDatedVists", query = "select u from Visit u  where u.dated = 0") })
public class Visit implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "visitId")
	private int visitId;

	@NotNull
	@Column(name = "completed", nullable = false)
	private Boolean completed = false;

	@NotNull
	@Column(name = "date", nullable = false, columnDefinition = "DATE")
	private LocalDateTime date;

	@NotNull
	@Column(name = "dated", nullable = false)
	private Boolean dated = false;

	@NotNull
	@Column(name = "initialDescription", nullable = false)
	private String initialDescription;

	@Column(name = "resolution", nullable = true)
	private String resolution;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "prescriptionId")
	private Prescription prescription = null;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "doctorId")
	private Doctor doctor;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "patientId")
	private Patient patient;

	public Visit() {
		// Constructor vacío para poder crear la tabla mediante JPA
	}

	public int getVisitId() {
		return visitId;
	}

	public void setVisitId(int visitId) {
		this.visitId = visitId;
	}

	public LocalDateTime getDate() {
		return date;
	}

	public void setDate(LocalDateTime date) {
		this.date = date;
	}

	public Prescription getPrescription() {
		return prescription;
	}

	public void setPrescription(Prescription prescription) {
		this.prescription = prescription;
	}

	public Doctor getDoctor() {
		return doctor;
	}

	public void setDoctor(Doctor doctor) {
		this.doctor = doctor;
	}

	public Boolean getCompleted() {
		return completed;
	}

	public void setCompleted(Boolean completed) {
		this.completed = completed;
	}

	public String getInitialDescription() {
		return initialDescription;
	}

	public void setInitialDescription(String initialDescription) {
		this.initialDescription = initialDescription;
	}

	public String getResolution() {
		return resolution;
	}

	public void setResolution(String resolution) {
		this.resolution = resolution;
	}

	public Patient getPatient() {
		return patient;
	}

	public void setPatient(Patient patient) {
		this.patient = patient;
	}
}
