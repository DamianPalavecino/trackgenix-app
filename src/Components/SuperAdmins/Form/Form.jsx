const Form = () => {
  return (
    <form>
      <div>
        <h2>Edit Admin</h2>
      </div>
      <div>
        <label>First Name</label>
        <input type="text" name="First Name" />
        <label>Last Name</label>
        <input type="text" name="Last Name" />
        <label>Email</label>
        <input type="text" name="Email" />
        <label>Password</label>
        <input type="text" name="Password" />
      </div>
    </form>
  );
};

export default Form;
