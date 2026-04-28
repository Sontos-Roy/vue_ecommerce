<template>
  <section class="auth-section">
    <div class="auth-card">
      <h2>Login</h2>

      <input type="email" placeholder="Email Address" />
      <input type="password" placeholder="Password" />

      <button class="primary-btn">Login</button>

      <p>
        No account?
        <RouterLink to="/register">Create account</RouterLink>
      </p>
    </div>
  </section>
</template>