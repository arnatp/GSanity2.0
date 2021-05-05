package cat.institutmarianao.domain;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "prescription")
@NamedQueries({ @NamedQuery(name = "Prescription.findAll", query = "select u from Prescription u"),
		@NamedQuery(name = "Prescription.findByPrescriptionId", query = "select u from Prescription u where u.prescriptionId = :prescriptionId") })
public class Prescription implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "prescriptionId")
	private int prescriptionId;

	@NotNull
	@Column(name = "medicamentName", nullable = false)
	private String medicamentName;

	@NotNull
	@Column(name = "quantity", nullable = false)
	private int quantity;

	@NotNull
	@Column(name = "schedule", nullable = false)
	private String schedule;

	@OneToOne(mappedBy = "prescription", cascade = CascadeType.ALL, fetch = FetchType.LAZY, optional = false)
	private Visit visit;

	public Prescription() {
		// Constructor vacío para poder crear la tabla mediante JPA
	}

	public int getPrescriptionId() {
		return prescriptionId;
	}

	public void setPrescriptionId(int prescriptionId) {
		this.prescriptionId = prescriptionId;
	}

	public String getMedicamentName() {
		return medicamentName;
	}

	public void setMedicamentName(String medicamentName) {
		this.medicamentName = medicamentName;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public String getSchedule() {
		return schedule;
	}

	public void setSchedule(String schedule) {
		this.schedule = schedule;
	}

}
