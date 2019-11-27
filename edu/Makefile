all:
	mkdir -p pizza
	rsync\
	  -a\
	  -d\
	  --exclude .git\
	  --exclude .gitignore\
	  --exclude .gitkeep\
	  --exclude .gitlab-ci.yml\
	  --exclude .idea\
	  pizza.git/ pizza

clean:
	rm -fr pizza
