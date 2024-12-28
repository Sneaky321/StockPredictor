import {defineConfig} from "vite"

export default defineConfig({
	define: {
	  // This provides a mock of process.env
	  'process.env': {}
	}
  })