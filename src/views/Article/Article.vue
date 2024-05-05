<template>
  <header class="article-header">
    <span class="content-title">New Article</span>
  </header>
  <section class="article-form">
    <form class="row g-0">
      <div class="col-9">
        <div class="form-group">
          <label class="title-label">Title</label>
          <input type="text" class="form-control" />
          <span class="required" :class="{ 'd-none': false }"
            >Required field</span
          >
        </div>
        <div class="form-group">
          <label class="description-label">Description</label>
          <input type="text" class="form-control" />
          <span class="required" :class="{ 'd-none': false }"
            >Required field</span
          >
        </div>
        <div class="form-group">
          <label class="body-label">Body</label>
          <textarea class="form-control" />
          <span class="required" :class="{ 'd-none': false }"
            >Required field</span
          >
        </div>
        <button class="submit">Submit</button>
      </div>
      <div class="col-3 tags">
        <div class="form-group">
          <label class="tags-label">Tags</label>
          <input type="text" class="form-control" />
        </div>
        <article class="tag-list">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
            <label class="form-check-label" for="flexCheckDefault">
              Default checkbox
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckChecked"
              checked
            />
            <label class="form-check-label" for="flexCheckChecked">
              Checked checkbox
            </label>
          </div>
        </article>
      </div>
    </form>
  </section>
</template>

<script>
export default {};
</script>

<style src="./style.css" scoped></style>
