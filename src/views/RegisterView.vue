<template>
  <section class="auth-section">
    <div class="auth-card">
      <h2>Create Account</h2>

      <input type="text" placeholder="Full Name" />
      <input type="email" placeholder="Email Address" />
      <input type="password" placeholder="Password" />

      <button class="primary-btn">Register</button>

      <p>
        Already have account?
        <RouterLink to="/login">Login</RouterLink>
      </p>
    </div>
  </section>
</template>